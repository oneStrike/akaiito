import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtConfigService } from '@/config/jwt.config'

/**
 * AdminJwtPayload 接口
 * 定义了管理员用户的 JWT 负载结构
 * 包含用户标识、用户名、角色和可选的权限列表
 */
export interface AdminJwtPayload {
  sub: string // 用户唯一标识符
  username: string // 用户名
  role: 'admin' // 用户角色，固定为 'admin'
  permissions?: string[] // 可选的权限列表
}

/**
 * AdminTokens 接口
 * 定义了访问令牌和刷新令牌的结构
 * 用于返回给客户端的认证凭证
 */
export interface AdminTokens {
  accessToken: string // 访问令牌
  refreshToken: string // 刷新令牌
}

/**
 * AdminJwtService 服务
 * 负责管理员用户的 JWT 令牌生成和验证
 * 提供生成访问令牌和刷新令牌的功能
 */
@Injectable()
export class AdminJwtService {
  constructor(
    private jwtService: JwtService, // 注入 JwtService
    private jwtConfigService: JwtConfigService, // 注入 JwtConfigService
  ) {}

  /**
   * 生成访问令牌和刷新令牌
   * @param payload 不包含角色的 JWT 负载
   * @returns 包含访问令牌和刷新令牌的对象
   */
  async generateTokens(
    payload: Omit<AdminJwtPayload, 'role'>,
  ): Promise<AdminTokens> {
    const adminPayload: AdminJwtPayload = {
      ...payload,
      role: 'admin', // 确保角色为 'admin'
    }

    const config = this.jwtConfigService.getAdminJwtConfig() // 获取管理员 JWT 配置

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(adminPayload, {
        secret: config.secret, // 使用配置中的密钥
        expiresIn: config.signOptions.expiresIn, // 设置访问令牌过期时间
      }),
      this.jwtService.signAsync(
        { sub: payload.sub, type: 'refresh', role: 'admin' },
        {
          secret: config.secret, // 使用配置中的密钥
          expiresIn: config.refreshExpiresIn, // 设置刷新令牌过期时间
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  /**
   * 验证 JWT 令牌
   * @param token 要验证的 JWT 令牌
   * @returns 解码后的 JWT 负载
   */
  async verifyToken(token: string): Promise<AdminJwtPayload> {
    const config = this.jwtConfigService.getAdminJwtConfig()
    return this.jwtService.verifyAsync(token, {
      secret: config.secret,
    })
  }

  /**
   * 使用刷新令牌生成新的访问令牌
   * @param refreshToken 刷新令牌
   * @returns 新的访问令牌
   * @throws 如果刷新令牌无效或已过期
   */
  async refreshAccessToken(refreshToken: string): Promise<string> {
    const config = this.jwtConfigService.getAdminJwtConfig()

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: config.secret,
    })

    if (payload.type !== 'refresh' || payload.role !== 'admin') {
      throw new Error('Invalid refresh token')
    }

    const newPayload: AdminJwtPayload = {
      sub: payload.sub,
      username: payload.username || 'admin',
      role: 'admin',
    }

    return this.jwtService.signAsync(newPayload, {
      secret: config.secret,
      expiresIn: config.signOptions.expiresIn,
    })
  }
}
