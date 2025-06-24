import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { Cron, CronExpression } from '@nestjs/schedule'
import { EnhancedBaseRepositoryService } from './enhanced-base-repository.service'
import { PrismaService } from './prisma.service'

/**
 * 冗余数据同步统计信息
 */
export interface SyncStatistics {
  /** 总同步次数 */
  totalSyncs: number
  /** 成功同步次数 */
  successSyncs: number
  /** 失败同步次数 */
  failedSyncs: number
  /** 最后同步时间 */
  lastSyncTime: Date | null
  /** 最后失败时间 */
  lastFailureTime: Date | null
  /** 最后失败原因 */
  lastFailureReason: string | null
}

/**
 * 冗余数据一致性检查结果
 */
export interface ConsistencyCheckResult {
  /** 检查时间 */
  checkTime: Date
  /** 总检查的服务数 */
  totalServices: number
  /** 一致的服务数 */
  consistentServices: number
  /** 不一致的详情 */
  inconsistencies: Array<{
    serviceName: string
    modelName: string
    details: Array<{
      targetTable: string
      relationId: any
      field: string
      expected: number
      actual: number
    }>
  }>
}

/**
 * 冗余数据同步管理器
 * 统一管理所有增强基础服务的冗余数据同步
 */
@Injectable()
export class RedundantDataManagerService implements OnModuleInit {
  private readonly logger = new Logger(RedundantDataManagerService.name)
  private readonly registeredServices = new Map<
    string,
    EnhancedBaseRepositoryService<any>
  >()

  private readonly syncStatistics = new Map<string, SyncStatistics>()
  private isFullSyncRunning = false

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    this.logger.log('冗余数据同步管理器已启动')

    // 启动时执行一次数据一致性检查
    setTimeout(() => {
      this.performConsistencyCheck().catch((error) => {
        this.logger.error('启动时一致性检查失败', error)
      })
    }, 5000) // 延迟5秒，确保所有服务都已注册
  }

  /**
   * 注册增强基础服务
   */
  registerService(
    serviceName: string,
    service: EnhancedBaseRepositoryService<any>,
  ) {
    this.registeredServices.set(serviceName, service)
    this.syncStatistics.set(serviceName, {
      totalSyncs: 0,
      successSyncs: 0,
      failedSyncs: 0,
      lastSyncTime: null,
      lastFailureTime: null,
      lastFailureReason: null,
    })
    this.logger.log(`已注册冗余数据同步服务: ${serviceName}`)
  }

  /**
   * 获取所有注册的服务
   */
  getRegisteredServices(): string[] {
    return Array.from(this.registeredServices.keys())
  }

  /**
   * 获取同步统计信息
   */
  getSyncStatistics(
    serviceName?: string,
  ): Map<string, SyncStatistics> | SyncStatistics | null {
    if (serviceName) {
      return this.syncStatistics.get(serviceName) || null
    }
    return this.syncStatistics
  }

  /**
   * 手动触发指定服务的全量同步
   */
  async triggerFullSync(serviceName: string): Promise<void> {
    const service = this.registeredServices.get(serviceName)
    if (!service) {
      throw new Error(`服务 ${serviceName} 未注册`)
    }

    const stats = this.syncStatistics.get(serviceName)!
    stats.totalSyncs++

    try {
      this.logger.log(`开始全量同步: ${serviceName}`)
      await service.fullSyncRedundantData()

      stats.successSyncs++
      stats.lastSyncTime = new Date()
      this.logger.log(`全量同步完成: ${serviceName}`)
    } catch (error) {
      stats.failedSyncs++
      stats.lastFailureTime = new Date()
      stats.lastFailureReason =
        error instanceof Error ? error.message : String(error)
      this.logger.error(`全量同步失败: ${serviceName}`, error)
      throw error
    }
  }

  /**
   * 触发所有服务的全量同步
   */
  async triggerFullSyncAll(): Promise<void> {
    if (this.isFullSyncRunning) {
      throw new Error('全量同步正在进行中，请稍后再试')
    }

    this.isFullSyncRunning = true
    this.logger.log('开始全量同步所有服务')

    try {
      const serviceNames = Array.from(this.registeredServices.keys())

      for (const serviceName of serviceNames) {
        try {
          await this.triggerFullSync(serviceName)
        } catch (error) {
          this.logger.error(
            `服务 ${serviceName} 全量同步失败，继续处理其他服务`,
            error,
          )
        }
      }

      this.logger.log('所有服务全量同步完成')
    } finally {
      this.isFullSyncRunning = false
    }
  }

  /**
   * 执行数据一致性检查
   */
  async performConsistencyCheck(): Promise<ConsistencyCheckResult> {
    this.logger.log('开始执行数据一致性检查')

    const result: ConsistencyCheckResult = {
      checkTime: new Date(),
      totalServices: this.registeredServices.size,
      consistentServices: 0,
      inconsistencies: [],
    }

    for (const [serviceName, service] of this.registeredServices) {
      try {
        const validation = await service.validateRedundantDataConsistency()

        if (validation.isConsistent) {
          result.consistentServices++
        } else {
          result.inconsistencies.push({
            serviceName,
            modelName: (service as any).modelName,
            details: validation.inconsistencies,
          })
        }
      } catch (error) {
        this.logger.error(`服务 ${serviceName} 一致性检查失败`, error)
        result.inconsistencies.push({
          serviceName,
          modelName: (service as any).modelName,
          details: [
            {
              targetTable: 'unknown',
              relationId: 'unknown',
              field: 'unknown',
              expected: 0,
              actual: 0,
            },
          ],
        })
      }
    }

    this.logger.log(
      `数据一致性检查完成: ${result.consistentServices}/${result.totalServices} 服务数据一致`,
    )

    if (result.inconsistencies.length > 0) {
      this.logger.warn(
        `发现 ${result.inconsistencies.length} 个服务存在数据不一致`,
      )
    }

    return result
  }

  /**
   * 修复数据不一致问题
   */
  async fixInconsistencies(serviceNames?: string[]): Promise<void> {
    const servicesToFix =
      serviceNames || Array.from(this.registeredServices.keys())

    this.logger.log(`开始修复数据不一致问题: ${servicesToFix.join(', ')}`)

    for (const serviceName of servicesToFix) {
      try {
        await this.triggerFullSync(serviceName)
        this.logger.log(`服务 ${serviceName} 数据修复完成`)
      } catch (error) {
        this.logger.error(`服务 ${serviceName} 数据修复失败`, error)
      }
    }
  }

  /**
   * 定时任务：每小时执行一次全量同步
   */
  @Cron(CronExpression.EVERY_HOUR)
  async scheduledFullSync() {
    if (this.isFullSyncRunning) {
      this.logger.warn('跳过定时全量同步，因为已有同步任务在运行')
      return
    }

    try {
      this.logger.log('开始定时全量同步')
      await this.triggerFullSyncAll()
    } catch (error) {
      this.logger.error('定时全量同步失败', error)
    }
  }

  /**
   * 定时任务：每天凌晨2点执行数据一致性检查
   */
  @Cron('0 2 * * *')
  async scheduledConsistencyCheck() {
    try {
      const result = await this.performConsistencyCheck()

      // 如果发现不一致，自动修复
      if (result.inconsistencies.length > 0) {
        this.logger.warn('定时检查发现数据不一致，开始自动修复')
        const inconsistentServices = result.inconsistencies.map(
          (item) => item.serviceName,
        )
        await this.fixInconsistencies(inconsistentServices)
      }
    } catch (error) {
      this.logger.error('定时一致性检查失败', error)
    }
  }

  /**
   * 监听冗余数据事件
   */
  @OnEvent('redundant-data.**')
  handleRedundantDataEvent(payload: {
    modelName: string
    eventType: string
    data: any
    timestamp: Date
  }) {
    // 记录事件日志（可选）
    this.logger.debug(
      `冗余数据事件: ${payload.modelName}.${payload.eventType}`,
      {
        timestamp: payload.timestamp,
        dataCount: Array.isArray(payload.data) ? payload.data.length : 1,
      },
    )

    // 可以在这里添加更多的事件处理逻辑
    // 比如发送通知、记录审计日志等
  }

  /**
   * 获取系统健康状态
   */
  getHealthStatus(): {
    isHealthy: boolean
    registeredServices: number
    isFullSyncRunning: boolean
    recentFailures: Array<{
      serviceName: string
      lastFailureTime: Date
      lastFailureReason: string
    }>
  } {
    const recentFailures: Array<{
      serviceName: string
      lastFailureTime: Date
      lastFailureReason: string
    }> = []

    // 检查最近24小时内的失败
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    for (const [serviceName, stats] of this.syncStatistics) {
      if (stats.lastFailureTime && stats.lastFailureTime > oneDayAgo) {
        recentFailures.push({
          serviceName,
          lastFailureTime: stats.lastFailureTime,
          lastFailureReason: stats.lastFailureReason || 'Unknown error',
        })
      }
    }

    return {
      isHealthy: recentFailures.length === 0 && !this.isFullSyncRunning,
      registeredServices: this.registeredServices.size,
      isFullSyncRunning: this.isFullSyncRunning,
      recentFailures,
    }
  }

  /**
   * 重置统计信息
   */
  resetStatistics(serviceName?: string): void {
    if (serviceName) {
      const stats = this.syncStatistics.get(serviceName)
      if (stats) {
        Object.assign(stats, {
          totalSyncs: 0,
          successSyncs: 0,
          failedSyncs: 0,
          lastSyncTime: null,
          lastFailureTime: null,
          lastFailureReason: null,
        })
      }
    } else {
      for (const stats of this.syncStatistics.values()) {
        Object.assign(stats, {
          totalSyncs: 0,
          successSyncs: 0,
          failedSyncs: 0,
          lastSyncTime: null,
          lastFailureTime: null,
          lastFailureReason: null,
        })
      }
    }

    this.logger.log(`统计信息已重置: ${serviceName || '所有服务'}`)
  }
}
