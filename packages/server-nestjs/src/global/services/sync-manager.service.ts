import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { Cron, CronExpression } from '@nestjs/schedule'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import { PrismaService } from './prisma.service'

/**
 * 同步统计信息
 */
export interface SyncStats {
  serviceName: string
  totalSyncs: number
  lastSyncTime: Date | null
  errors: number
}

/**
 * 简化的冗余数据同步管理器
 * 自动发现和管理使用 @SyncRedundantData 装饰器的服务
 */
@Injectable()
export class SyncManagerService implements OnModuleInit {
  private readonly logger = new Logger(SyncManagerService.name)
  private readonly syncStats = new Map<string, SyncStats>()
  private readonly decoratedServices = new Set<any>()

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async onModuleInit() {
    // 延迟发现服务，确保所有模块已加载
    setTimeout(() => {
      this.discoverDecoratedServices()
    }, 1000)
  }

  /**
   * 自动发现使用装饰器的服务
   */
  private discoverDecoratedServices() {
    try {
      // 获取所有服务实例
      const services = this.getAllServices()
      let discoveredCount = 0

      for (const [serviceName, service] of services) {
        // 检查是否有同步配置元数据
        const configs = Reflect.getMetadata('SYNC_CONFIGS', service.constructor)
        if (configs) {
          this.decoratedServices.add(service)
          this.syncStats.set(serviceName, {
            serviceName,
            totalSyncs: 0,
            lastSyncTime: null,
            errors: 0
          })
          discoveredCount++
        }
      }

      this.logger.log(`发现 ${discoveredCount} 个使用同步装饰器的服务`)
    } catch (error) {
      this.logger.error('服务发现失败', error)
    }
  }

  /**
   * 获取所有服务实例
   */
  private getAllServices(): Map<string, any> {
    const services = new Map<string, any>()
    
    try {
      // 这里需要根据实际的NestJS版本和配置来获取服务
      // 简化实现，实际项目中可能需要更复杂的逻辑
      const container = (this.moduleRef as any).container
      if (container && container.modules) {
        for (const module of container.modules.values()) {
          if (module.providers) {
            for (const [token, provider] of module.providers) {
              if (provider.instance && typeof token === 'string') {
                services.set(token, provider.instance)
              }
            }
          }
        }
      }
    } catch (error) {
      this.logger.warn('无法自动获取服务列表，请手动注册服务')
    }
    
    return services
  }

  /**
   * 监听同步事件
   */
  @OnEvent('redundant.sync')
  handleSyncEvent(payload: any) {
    const serviceName = payload.config || 'unknown'
    const stats = this.syncStats.get(serviceName)
    if (stats) {
      stats.totalSyncs++
      stats.lastSyncTime = new Date()
    }
  }

  /**
   * 每小时执行一次全量同步检查
   */
  @Cron(CronExpression.EVERY_HOUR)
  async scheduledSync() {
    this.logger.log('开始定时同步检查')
    
    for (const service of this.decoratedServices) {
      try {
        // 如果服务有 manualSync 方法，则调用
        if (typeof service.manualSync === 'function') {
          await service.manualSync()
        }
      } catch (error) {
        this.logger.error(`定时同步失败 [${service.constructor.name}]`, error)
        
        const stats = this.syncStats.get(service.constructor.name)
        if (stats) {
          stats.errors++
        }
      }
    }
  }

  /**
   * 获取同步统计信息
   */
  getSyncStats(): SyncStats[] {
    return Array.from(this.syncStats.values())
  }

  /**
   * 手动触发全量同步
   */
  async triggerFullSync(): Promise<{ success: boolean; results: any[] }> {
    const results = []
    
    for (const service of this.decoratedServices) {
      try {
        if (typeof service.manualSync === 'function') {
          const result = await service.manualSync()
          results.push({
            service: service.constructor.name,
            success: true,
            result
          })
        }
      } catch (error) {
        results.push({
          service: service.constructor.name,
          success: false,
          error: error.message
        })
      }
    }
    
    return {
      success: results.every(r => r.success),
      results
    }
  }

  /**
   * 获取系统健康状态
   */
  getHealthStatus() {
    const stats = this.getSyncStats()
    const totalServices = stats.length
    const healthyServices = stats.filter(s => s.errors === 0).length
    
    return {
      status: healthyServices === totalServices ? 'healthy' : 'warning',
      totalServices,
      healthyServices,
      lastCheck: new Date(),
      details: stats
    }
  }

  /**
   * 重置统计信息
   */
  resetStats() {
    for (const stats of this.syncStats.values()) {
      stats.totalSyncs = 0
      stats.errors = 0
      stats.lastSyncTime = null
    }
  }
}