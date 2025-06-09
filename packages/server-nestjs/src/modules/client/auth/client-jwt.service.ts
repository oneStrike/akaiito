import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtBlacklistService } from '@/common/services/jwt-blacklist.service'
import { JwtConfigService } from '@/config/jwt.config'

/**
 * ClientJwtPayload 接口
 * 定义了客户端用户的 JWT 负载结构
 * 包含用户标识、用户名、角色和可选的权限列表
 */
export interface ClientJwtPayload {
  sub: string // 用户唯一标识符
  username: string // 用户名
  role: 'client' // 用户角色，固定为 'client'
  clientId?: string // 可选的客户端标识符
  permissions?: string[] // 可选的权限列表
}

/**
 * ClientTokens 接口
 * 定义了访问令牌和刷新令牌的结构
 * 用于返回给客户端的认证凭证
 */
export interface ClientTokens {
  accessToken: string // 访问令牌
  refreshToken: string // 刷新令牌
}

/**
 * ClientJwtService 服务
 * 负责客户端用户的 JWT 令牌生成和验证
 * 提供生成访问令牌和刷新令牌的功能
 */
@Injectable()
export class ClientJwtService {
  constructor(
    private jwtService: JwtService, // 注入 JwtService
    private jwtConfigService: JwtConfigService, // 注入 JwtConfigService
    private jwtBlacklistService: JwtBlacklistService, // 注入 JWT 黑名单服务
  ) {}

  /**
   * 生成访问令牌和刷新令牌
   * @param payload 不包含角色的 JWT 负载
   * @returns 包含访问令牌和刷新令牌的对象
   */
  async generateTokens(
    payload: Omit<ClientJwtPayload, 'role'>,
  ): Promise<ClientTokens> {
    const clientPayload: ClientJwtPayload = {
      ...payload,
      role: 'client', // 确保角色为 'client'
    }

    const config = this.jwtConfigService.getClientJwtConfig() // 获取客户端 JWT 配置

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(clientPayload, {
        secret: config.secret, // 使用配置中的密钥
        expiresIn: config.signOptions.expiresIn, // 设置访问令牌过期时间
      }),
      this.jwtService.signAsync(
        { sub: payload.sub, type: 'refresh', role: 'client' },
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
  async verifyToken(token: string): Promise<ClientJwtPayload> {
    const config = this.jwtConfigService.getClientJwtConfig()
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
    const config = this.jwtConfigService.getClientJwtConfig()

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: config.secret,
    })

    if (payload.type !== 'refresh' || payload.role !== 'client') {
      throw new Error('Invalid refresh token')
    }

    const newPayload: ClientJwtPayload = {
      sub: payload.sub,
      username: payload.username || 'client',
      role: 'client',
    }

    return this.jwtService.signAsync(newPayload, {
      secret: config.secret,
      expiresIn: config.signOptions.expiresIn,
    })
  }

  /**
   * 登出用户，将访问令牌和刷新令牌添加到黑名单
   * @param accessToken 访问令牌
   * @param refreshToken 刷新令牌
   * @returns 是否成功登出
   */
  async logout(accessToken: string, refreshToken?: string): Promise<boolean> {
    try {
      // 获取访问令牌的过期时间
      const config = this.jwtConfigService.getClientJwtConfig()
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: config.secret,
        ignoreExpiration: true, // 即使令牌已过期也解析它
      })

      // 计算令牌剩余的有效期（秒）
      const expTime = payload.exp * 1000 // 转换为毫秒
      const currentTime = Date.now()
      const ttl = Math.max(0, Math.floor((expTime - currentTime) / 1000))

      // 将访问令牌添加到黑名单
      await this.jwtBlacklistService.addToClientBlacklist(accessToken, ttl)

      // 如果提供了刷新令牌，也将其添加到黑名单
      if (refreshToken) {
        try {
          const refreshPayload = await this.jwtService.verifyAsync(refreshToken, {
            secret: config.secret,
            ignoreExpiration: true,
          })

          const refreshExpTime = refreshPayload.exp * 1000
          const refreshTtl = Math.max(0, Math.floor((refreshExpTime - currentTime) / 1000))

          await this.jwtBlacklistService.addToClientBlacklist(refreshToken, refreshTtl)
        } catch (error) {
          console.error('Error adding refresh token to blacklist:', error)
        }
      }

      return true
    } catch (error) {
      console.error('Error during logout:', error)
      return false
    }
  }
}
