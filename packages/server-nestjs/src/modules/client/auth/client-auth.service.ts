import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { AuthServiceBase } from '@/common/services/auth.service.base'
import { PrismaService } from '@/global/services/prisma.service'

export interface ClientLoginDto {
  username: string
  password: string
}

export interface ClientRegisterDto {
  username: string
  password: string
  mobile?: string
}

@Injectable()
export class ClientAuthService extends AuthServiceBase {
  constructor(
    jwtService: JwtService,
    configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super(jwtService, configService)
  }

  /**
   * 客户端用户登录
   */
  async login(loginDto: ClientLoginDto) {
    // 查找用户
    const user = await this.prisma.clientUser.findUnique({
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
      type: 'client' as const,
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
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      ...tokens,
    }
  }

  /**
   * 客户端用户注册
   */
  async register(registerDto: ClientRegisterDto) {
    // 检查用户名是否已存在
    const existingUser = await this.prisma.clientUser.findUnique({
      where: { username: registerDto.username },
    })

    if (existingUser) {
      throw new HttpException('用户名已存在', HttpStatus.CONFLICT)
    }

    // 加密密码
    const hashedPassword = await this.hashPassword(registerDto.password)

    // 创建用户
    const user = await this.prisma.clientUser.create({
      data: {
        username: registerDto.username,
        password: hashedPassword,
        mobile: registerDto.mobile,
        status: true,
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        mobile: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // 生成 JWT 令牌
    const payload = {
      sub: user.id,
      username: user.username,
      type: 'client' as const,
    }

    const tokens = this.generateTokens(payload)

    return {
      user,
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
      const user = await this.prisma.clientUser.findUnique({
        where: { id: payload.sub },
      })

      if (!user || !user.status) {
        throw new HttpException('用户不存在或已被禁用', HttpStatus.UNAUTHORIZED)
      }

      // 生成新的令牌对
      const newPayload = {
        sub: user.id,
        username: user.username,
        type: 'client' as const,
      }

      return this.generateTokens(newPayload)
    } catch (error) {
      throw new HttpException('刷新令牌无效', HttpStatus.UNAUTHORIZED)
    }
  }
}
