import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

/**
 * JWT 配置接口，定义统一的返回结构
 */
interface JwtConfig {
  secret: string
  signOptions: {
    expiresIn: string
  }
  refreshExpiresIn: string
}

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
  getAdminJwtConfig(): JwtConfig {
    return this.buildJwtConfig('ADMIN_JWT', 'admin-default-secret', '7d', '30d')
  }

  /**
   * 获取客户端 JWT 配置
   * @returns JWT 配置对象，包含密钥、签名选项和刷新令牌过期时间
   */
  getClientJwtConfig(): JwtConfig {
    return this.buildJwtConfig(
      'CLIENT_JWT',
      'client-default-secret',
      '24h',
      '7d',
    )
  }

  /**
   * 构建通用 JWT 配置对象
   * @param prefix 环境变量前缀
   * @param defaultSecret 默认密钥
   * @param defaultExpire 默认过期时间
   * @param defaultRefreshExpire 默认刷新令牌过期时间
   * @returns JWT 配置对象
   */
  private buildJwtConfig(
    prefix: string,
    defaultSecret: string,
    defaultExpire: string,
    defaultRefreshExpire: string,
  ): JwtConfig {
    const secret = this.getJwtSecret(`${prefix}_SECRET`, defaultSecret)
    return {
      secret,
      signOptions: {
        expiresIn: this.configService.get<string>(
          `${prefix}_EXPIRES_IN`,
          defaultExpire,
        ),
      },
      refreshExpiresIn: this.configService.get<string>(
        `${prefix}_REFRESH_EXPIRES_IN`,
        defaultRefreshExpire,
      ),
    }
  }

  /**
   * 获取 JWT 密钥
   * 在生产环境中，必须提供对应的环境变量
   * 在非生产环境中，使用配置文件中的值或默认值
   * @param key 环境变量键名
   * @param defaultValue 默认密钥值
   * @returns JWT 密钥
   */
  private getJwtSecret(key: string, defaultValue: string): string {
    const nodeEnv = this.configService.get<string>('NODE_ENV')

    if (nodeEnv === 'production') {
      const secret = process.env[key]
      if (!secret) {
        throw new Error(`${key} environment variable is required in production`)
      }
      return secret
    }

    return this.configService.get<string>(key, defaultValue)
  }
}
