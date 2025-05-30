import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Cache } from 'cache-manager'
import { AuthServiceBase } from '@/common/services/auth.service.base'
import { PrismaService } from '@/global/services/prisma.service'
import { UserLoginDto } from '../users/dto/user.dto'
import { CacheKey } from '../users/user.constant'

@Injectable()
export class AdminAuthService extends AuthServiceBase {
  constructor(
    jwtService: JwtService,
    configService: ConfigService,
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super(jwtService, configService)
  }

  /**
   * 管理员登录
   */
  async login(loginDto: UserLoginDto) {
    // 验证验证码
    await this.validateCaptcha(loginDto.captcha, loginDto.captchaId)

    // 查找用户
    const user = await this.prisma.adminUser.findUnique({
      where: { username: loginDto.username },
    })

    if (!user) {
      throw new HttpException('用户名或密码错误', HttpStatus.UNAUTHORIZED)
    }

    // 验证密码
    const isPasswordValid = await this.comparePassword(
      loginDto.password,
      user.password,
    )

    if (!isPasswordValid) {
      throw new HttpException('用户名或密码错误', HttpStatus.UNAUTHORIZED)
    }

    // 检查用户状态
    if (!user.status) {
      throw new HttpException('用户已被禁用', HttpStatus.FORBIDDEN)
    }

    // 生成 JWT 令牌
    const payload = {
      sub: user.id,
      username: user.username,
      type: 'admin' as const,
    }

    const tokens = this.generateTokens(payload)

    // 返回用户信息和令牌
    return {
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        mobile: user.mobile,
        status: user.status,
        isRoot: user.isRoot,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      ...tokens,
    }
  }

  /**
   * 刷新令牌
   */
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.verifyRefreshToken(refreshToken)

      // 验证用户是否仍然存在且状态正常
      const user = await this.prisma.adminUser.findUnique({
        where: { id: payload.sub },
      })

      if (!user || !user.status) {
        throw new HttpException('用户不存在或已被禁用', HttpStatus.UNAUTHORIZED)
      }

      // 生成新的令牌对
      const newPayload = {
        sub: user.id,
        username: user.username,
        type: 'admin' as const,
      }

      return this.generateTokens(newPayload)
    } catch (error) {
      throw new HttpException('刷新令牌无效', HttpStatus.UNAUTHORIZED)
    }
  }

  /**
   * 验证验证码
   */
  private async validateCaptcha(captcha: string, captchaId: string) {
    if (!captcha) {
      throw new HttpException('请输入验证码', HttpStatus.BAD_REQUEST)
    }

    const captchaText = await this.cacheManager.get(
      CacheKey.CAPTCHA + captchaId,
    )

    if (!captchaText) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST)
    }

    if (
      String(captchaText).toLowerCase() !== String(captcha).toLowerCase()
    ) {
      await this.cacheManager.del(CacheKey.CAPTCHA + captchaId)
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST)
    }

    // 验证通过后删除验证码
    await this.cacheManager.del(CacheKey.CAPTCHA + captchaId)
  }
}
