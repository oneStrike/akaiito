import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

/**
 * JWT黑名单服务
 * 用于管理已失效的JWT令牌
 * 将已注销的令牌添加到黑名单中，并在验证时检查令牌是否在黑名单中
 */
@Injectable()
export class JwtBlacklistService {
  // 黑名单缓存前缀
  private readonly ADMIN_BLACKLIST_PREFIX = 'jwt:blacklist:admin:'
  private readonly CLIENT_BLACKLIST_PREFIX = 'jwt:blacklist:client:'

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * 将令牌添加到管理员黑名单
   * @param token JWT令牌
   * @param expiresIn 过期时间（秒），默认为7天
   */
  async addToAdminBlacklist(token: string, expiresIn: number = 7 * 24 * 60 * 60): Promise<void> {
    await this.cacheManager.set(
      this.ADMIN_BLACKLIST_PREFIX + token,
      true,
      expiresIn * 1000,
    )
  }

  /**
   * 将令牌添加到客户端黑名单
   * @param token JWT令牌
   * @param expiresIn 过期时间（秒），默认为7天
   */
  async addToClientBlacklist(token: string, expiresIn: number = 7 * 24 * 60 * 60): Promise<void> {
    await this.cacheManager.set(
      this.CLIENT_BLACKLIST_PREFIX + token,
      true,
      expiresIn * 1000,
    )
  }

  /**
   * 检查令牌是否在管理员黑名单中
   * @param token JWT令牌
   * @returns 如果令牌在黑名单中，则返回true；否则返回false
   */
  async isInAdminBlacklist(token: string): Promise<boolean> {
    const result = await this.cacheManager.get(this.ADMIN_BLACKLIST_PREFIX + token)
    return result === true
  }

  /**
   * 检查令牌是否在客户端黑名单中
   * @param token JWT令牌
   * @returns 如果令牌在黑名单中，则返回true；否则返回false
   */
  async isInClientBlacklist(token: string): Promise<boolean> {
    const result = await this.cacheManager.get(this.CLIENT_BLACKLIST_PREFIX + token)
    return result === true
  }

  /**
   * 从管理员黑名单中移除令牌
   * @param token JWT令牌
   */
  async removeFromAdminBlacklist(token: string): Promise<void> {
    await this.cacheManager.del(this.ADMIN_BLACKLIST_PREFIX + token)
  }

  /**
   * 从客户端黑名单中移除令牌
   * @param token JWT令牌
   */
  async removeFromClientBlacklist(token: string): Promise<void> {
    await this.cacheManager.del(this.CLIENT_BLACKLIST_PREFIX + token)
  }
}
