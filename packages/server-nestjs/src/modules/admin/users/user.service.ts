import { Buffer } from 'node:buffer'
import * as process from 'node:process'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { FastifyRequest } from 'fastify'
import * as svgCaptcha from 'svg-captcha'
import { v4 as uuid } from 'uuid'
import { CryptoService } from '@/common/module/jwt/crypto.service'
import { RsaService } from '@/common/module/jwt/rsa.service'
import { BaseRepositoryService } from '@/global/services/base-repository.service'

import { PrismaService } from '@/global/services/prisma.service'
import { AdminJwtService } from '@/modules/admin/auth/admin-jwt.service'
import { TokenDto } from '@/modules/admin/users/dto/token.dto'
import { CacheKey } from '@/modules/admin/users/user.constant'
import {
  UpdatePasswordDto,
  UpdateUserDto,
  UserLoginDto,
  UserPageDto,
  UserRegisterDto,
} from './dto/user.dto'

@Injectable()
export class UserService extends BaseRepositoryService<'AdminUser'> {
  protected readonly modelName = 'AdminUser' as const
  constructor(
    private readonly rsa: RsaService,
    private readonly crypto: CryptoService,
    private readonly adminJwtService: AdminJwtService,
    protected readonly prisma: PrismaService, // 添加这个参数
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super(prisma)
  }

  /**
   * 获取验证码
   */
  async getCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 排除 0o1i
      noise: 3, // 噪声线条数量
      color: true, // 验证码的字符有颜色，而不是黑白
    })

    const uniqueId = uuid()
    await this.cacheManager.set(
      CacheKey.CAPTCHA + uniqueId,
      captcha.text,
      1000 * 60,
    )
    return {
      data: `data:image/svg+xml;base64,${Buffer.from(captcha.data).toString('base64')}`, // 使用引入的Buffer模块
      id: uniqueId,
    }
  }

  /**
   * 登录
   */
  async login(body: UserLoginDto) {
    // 检查用户输入的验证码
    if (!body.captcha) {
      throw new HttpException('请输入验证码', HttpStatus.BAD_REQUEST)
    }
    const captchaText = await this.cacheManager.get(
      CacheKey.CAPTCHA + body.captchaId,
    )

    if (process.env.NODE_ENV === 'production') {
      // 检查验证码是否存在于缓存中
      if (!captchaText) {
        throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST)
      }
      // 验证码比较（不区分大小写）
      if (
        String(captchaText).toLowerCase() !== String(body.captcha).toLowerCase()
      ) {
        await this.cacheManager.del(CacheKey.CAPTCHA + body.captchaId)
        throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST)
      }
    }

    // 验证通过后，删除已使用的验证码
    await this.cacheManager.del(CacheKey.CAPTCHA + body.captchaId)

    // 查找用户
    const user = await this.prisma.adminUser.findFirst({
      where: {
        OR: [{ username: body.username }],
      },
    })
    if (!user) {
      throw new HttpException('账号或密码错误', HttpStatus.BAD_REQUEST)
    }

    // 尝试解密密码（如果是RSA加密的）
    let password = body.password
    try {
      password = this.rsa.decryptWithAdmin(body.password)
    } catch (error) {
      throw new HttpException('账号或密码错误', HttpStatus.BAD_REQUEST)
    }

    // 验证密码
    const isPasswordValid = await this.crypto.verifyPassword(
      password,
      user.password,
    )
    if (!isPasswordValid) {
      throw new HttpException('账号或密码错误', HttpStatus.BAD_REQUEST)
    }

    // 生成令牌
    const tokens = await this.adminJwtService.generateTokens({
      sub: String(user.id),
      username: user.username,
    })

    // 去除 user 对象的 password 属性
    const { password: _password, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
      tokens,
    }
  }

  /**
   * 退出登录
   */
  async logout(body: TokenDto) {
    const { accessToken, refreshToken } = body
    // 将令牌添加到黑名单
    return this.adminJwtService.logout(accessToken, refreshToken)
  }

  /**
   * 刷新访问令牌
   */
  async refreshToken(refreshToken: string) {
    return this.adminJwtService.refreshAccessToken(refreshToken)
  }

  /**
   * 更新用户密码
   */
  async updatePassword(
    userId: number,
    body: UpdatePasswordDto,
    req: FastifyRequest,
  ) {
    const { oldPassword, newPassword, confirmPassword, refreshToken } = body
    if (newPassword !== confirmPassword) {
      throw new HttpException('新密码和确认密码不一致', HttpStatus.BAD_REQUEST)
    }

    const authHeader = req.headers.authorization!
    const accessToken = authHeader.substring(7) // 去掉 'Bearer ' 前缀

    // 查找用户
    const user = await this.prisma.adminUser.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND)
    }

    // 验证旧密码
    const isPasswordValid = await this.crypto.verifyPassword(
      oldPassword,
      user.password,
    )
    if (!isPasswordValid) {
      throw new HttpException('旧密码错误', HttpStatus.BAD_REQUEST)
    }

    // 加密新密码
    const encryptedPassword = await this.crypto.encryptPassword(newPassword)

    await this.adminJwtService.logout(accessToken, refreshToken)

    await this.prisma.adminUser.update({
      where: { id: userId },
      data: { password: encryptedPassword },
      select: {
        id: true,
      },
    })

    return userId
  }

  /**
   * 更新用户信息
   */
  async updateUserInfo(userId: number, updateData: UpdateUserDto) {
    userId = updateData.id || userId
    // 查找用户
    const user = await this.prisma.adminUser.findUnique({
      where: { id: userId },
    })
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND)
    }
    // 如果要更新用户名，检查是否已存在
    if (updateData.username && updateData.username !== user.username) {
      const existingUser = await this.prisma.adminUser.findUnique({
        where: { username: updateData.username },
      })

      if (existingUser) {
        throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
      }
    }

    // 如果要更新手机号，检查是否已存在
    if (updateData.mobile && updateData.mobile !== user.mobile) {
      const existingUser = await this.prisma.adminUser.findFirst({
        where: { mobile: updateData.mobile },
      })

      if (existingUser) {
        throw new HttpException('手机号已存在', HttpStatus.BAD_REQUEST)
      }
    }
    // 返回更新后的用户信息（不包含密码）
    return this.prisma.adminUser.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
      },
    })
  }

  /**
   * 注册管理员用户
   */
  async register(body: UserRegisterDto) {
    const { username, password, confirmPassword, mobile, avatar, isRoot } = body
    if (password !== confirmPassword) {
      throw new HttpException('密码和确认密码不一致', HttpStatus.BAD_REQUEST)
    }

    // 检查用户名是否已存在
    const existingUser = await this.prisma.adminUser.findFirst({
      where: {
        OR: [{ username }, { mobile }],
      },
    })

    if (existingUser) {
      throw new HttpException('用户名或手机号已被使用', HttpStatus.BAD_REQUEST)
    }

    // 加密密码
    const encryptedPassword = await this.crypto.encryptPassword(password)

    // 创建用户

    // 返回创建的用户（不包含密码）
    return this.prisma.adminUser.create({
      data: {
        username,
        password: encryptedPassword,
        mobile,
        avatar,
        isRoot,
      },
      select: {
        id: true,
      },
    })
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(userId: number) {
    const user = await this.prisma.adminUser.findUnique({
      where: { id: userId },
    })

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND)
    }

    // 返回用户信息（不包含密码）
    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      mobile: user.mobile,
      status: user.status,
      isRoot: user.isRoot,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  /**
   * 获取用户列表（分页）
   */
  async getUsers(queryDto: UserPageDto) {
    const { username, mobile, status, isRoot } = queryDto

    const where: any = {}
    
    if (username) {
      where.username = { contains: username }
    }
    if (mobile) {
      where.mobile = { contains: mobile }
    }
    if (status !== undefined) {
      where.status = { equals: status }
    }
    if (isRoot !== undefined) {
      where.isRoot = { equals: isRoot }
    }

    return this.findPagination({
      where,
      ...queryDto,
      omit: {
        password: true,
      },
    })
  }
}
