import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

/**
 * JWT 配置服务
 * 负责提供 Admin 和 Client 模块的 JWT 配置，包括密钥、过期时间等
 * 从环境变量或配置文件中获取配置信息
 */
@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  /**
   * 获取管理员 JWT 配置
   * @returns JWT 配置对象，包含密钥、签名选项和刷新令牌过期时间
   */
  getAdminJwtConfig() {
    const secret = this.getAdminJwtSecret()
    return {
      secret,
      signOptions: {
        expiresIn: this.configService.get<string>('ADMIN_JWT_EXPIRES_IN', '7d'),
      },
      refreshExpiresIn: this.configService.get<string>(
        'ADMIN_JWT_REFRESH_EXPIRES_IN',
        '30d',
      ),
    }
  }

  /**
   * 获取客户端 JWT 配置
   * @returns JWT 配置对象，包含密钥、签名选项和刷新令牌过期时间
   */
  getClientJwtConfig() {
    const secret = this.getClientJwtSecret()
    return {
      secret,
      signOptions: {
        expiresIn: this.configService.get<string>(
          'CLIENT_JWT_EXPIRES_IN',
          '24h',
        ),
      },
      refreshExpiresIn: this.configService.get<string>(
        'CLIENT_JWT_REFRESH_EXPIRES_IN',
        '7d',
      ),
    }
  }

  /**
   * 获取管理员 JWT 密钥
   * 在生产环境中，必须提供 ADMIN_JWT_SECRET 环境变量
   * 在非生产环境中，使用配置文件中的值或默认值
   * @returns 管理员 JWT 密钥
   */
  private getAdminJwtSecret(): string {
    const nodeEnv = this.configService.get<string>('NODE_ENV')

    if (nodeEnv === 'production') {
      const secret = process.env.ADMIN_JWT_SECRET
      if (!secret) {
        throw new Error(
          'ADMIN_JWT_SECRET environment variable is required in production',
        )
      }
      return secret
    }
    return this.configService.get<string>(
      'ADMIN_JWT_SECRET',
      'admin-default-secret',
    )
  }

  /**
   * 获取客户端 JWT 密钥
   * 在生产环境中，必须提供 CLIENT_JWT_SECRET 环境变量
   * 在非生产环境中，使用配置文件中的值或默认值
   * @returns 客户端 JWT 密钥
   */
  private getClientJwtSecret(): string {
    const nodeEnv = this.configService.get<string>('NODE_ENV')

    if (nodeEnv === 'production') {
      const secret = process.env.CLIENT_JWT_SECRET
      if (!secret) {
        throw new Error(
          'CLIENT_JWT_SECRET environment variable is required in production',
        )
      }
      return secret
    }
    return this.configService.get<string>(
      'CLIENT_JWT_SECRET',
      'client-default-secret',
    )
  }
}
