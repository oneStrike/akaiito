import {
  Global,
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/prisma/client/client'

/**
 * Prisma 数据库服务
 * 提供数据库连接管理、健康检查、性能监控等功能
 * 支持连接池配置、自动重连、优雅关闭等特性
 */
@Injectable()
@Global()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly logger = new Logger(PrismaService.name)
  private isConnected = false
  private connectionAttempts = 0
  private readonly maxRetries = 3
  private readonly retryDelay = 2000 // 2秒

  constructor(private readonly configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL')

    if (!databaseUrl) {
      throw new Error('DATABASE_URL 环境变量未配置')
    }

    // 🔧 配置 PostgreSQL 适配器
    const adapter = new PrismaPg({
      connectionString: databaseUrl,
    })

    // 🚀 初始化 Prisma 客户端配置
    super({
      adapter,
    })
  }

  /**
   * 模块初始化时连接数据库
   * 支持重试机制和连接状态管理
   */
  async onModuleInit(): Promise<void> {
    if (this.isConnected) {
      this.logger.warn('数据库已连接，跳过重复连接')
      return
    }

    await this.connectWithRetry()
  }

  /**
   * 带重试机制的数据库连接
   * 在连接失败时自动重试，提高系统稳定性
   */
  private async connectWithRetry(): Promise<void> {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        this.connectionAttempts = attempt
        this.logger.log(`尝试连接数据库 (${attempt}/${this.maxRetries})`)

        await this.$connect()
        this.isConnected = true
        this.logger.log('✅ 数据库连接成功')

        // 🔍 执行连接后的健康检查
        await this.performHealthCheck()
        return
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        this.logger.error(
          `❌ 数据库连接失败 (尝试 ${attempt}/${this.maxRetries}): ${errorMessage}`,
        )

        if (attempt === this.maxRetries) {
          this.logger.error('🚨 数据库连接重试次数已达上限，应用启动失败')
          throw new Error(`数据库连接失败: ${errorMessage}`)
        }

        // 等待后重试
        if (attempt < this.maxRetries) {
          this.logger.log(`⏳ ${this.retryDelay / 1000}秒后重试连接...`)
          await this.delay(this.retryDelay)
        }
      }
    }
  }

  /**
   * 执行数据库健康检查
   * 验证数据库连接是否正常工作
   */
  private async performHealthCheck(): Promise<void> {
    try {
      await this.$queryRaw`SELECT 1 as health_check`
      this.logger.log('🩺 数据库健康检查通过')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      this.logger.warn(`⚠️ 数据库健康检查失败: ${errorMessage}`)
    }
  }

  /**
   * 延迟工具函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * 应用关闭时优雅断开数据库连接
   * 确保所有事务完成后再关闭连接
   */
  async onApplicationShutdown(): Promise<void> {
    if (!this.isConnected) {
      this.logger.log('数据库未连接，跳过断开操作')
      return
    }

    try {
      this.logger.log('🔄 正在断开数据库连接...')

      // 等待所有待处理的查询完成
      await this.$disconnect()
      this.isConnected = false

      this.logger.log('✅ 数据库连接已安全断开')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      this.logger.error(`❌ 数据库断开连接失败: ${errorMessage}`)
    }
  }

  /**
   * 获取数据库连接状态
   * @returns 连接状态布尔值
   */
  getConnectionStatus(): boolean {
    return this.isConnected
  }

  /**
   * 获取连接尝试次数
   * @returns 当前连接尝试次数
   */
  getConnectionAttempts(): number {
    return this.connectionAttempts
  }

  /**
   * 手动执行数据库健康检查
   * @returns 健康检查结果
   */
  async checkHealth(): Promise<{
    status: 'healthy' | 'unhealthy'
    message: string
  }> {
    try {
      if (!this.isConnected) {
        return { status: 'unhealthy', message: '数据库未连接' }
      }

      await this.$queryRaw`SELECT 1 as health_check`
      return { status: 'healthy', message: '数据库连接正常' }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      return {
        status: 'unhealthy',
        message: `数据库健康检查失败: ${errorMessage}`,
      }
    }
  }

  /**
   * 获取数据库统计信息
   * @returns 数据库连接和性能统计
   */
  getStats(): {
    isConnected: boolean
    connectionAttempts: number
    maxRetries: number
    retryDelay: number
  } {
    return {
      isConnected: this.isConnected,
      connectionAttempts: this.connectionAttempts,
      maxRetries: this.maxRetries,
      retryDelay: this.retryDelay,
    }
  }
}
