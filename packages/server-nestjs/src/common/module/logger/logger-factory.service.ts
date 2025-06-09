import { Injectable } from '@nestjs/common'
import { createLogger, Logger } from 'winston'
import { createWinstonConfig, LogModule } from '@/config/logger.config'
import { CustomLoggerService } from './logger.service'

/**
 * 日志工厂服务
 * 负责创建和管理不同模块的日志器实例
 */
@Injectable()
export class LoggerFactoryService {
  private readonly loggers = new Map<LogModule, Logger>()
  private readonly loggerServices = new Map<string, CustomLoggerService>()

  constructor() {
    this.initializeLoggers()
  }

  /**
   * 初始化所有模块的日志器
   */
  private initializeLoggers(): void {
    // 创建各模块的Winston日志器实例
    Object.values(LogModule).forEach((module) => {
      const config = createWinstonConfig(module)
      const logger = createLogger(config)
      this.loggers.set(module, logger)
    })
  }

  /**
   * 获取指定模块的Winston日志器
   */
  getWinstonLogger(module: LogModule): Logger {
    const logger = this.loggers.get(module)
    if (!logger) {
      throw new Error(`Logger for module ${module} not found`)
    }
    return logger
  }

  /**
   * 创建自定义日志服务实例
   */
  createLogger(module: LogModule, context?: string): CustomLoggerService {
    const cacheKey = `${module}-${context || 'default'}`

    // 检查缓存
    if (this.loggerServices.has(cacheKey)) {
      return this.loggerServices.get(cacheKey)!
    }

    // 创建新的日志服务实例
    const winstonLogger = this.getWinstonLogger(module)
    const loggerService = new CustomLoggerService(winstonLogger, module)

    if (context) {
      loggerService.setContext(context)
    }

    // 缓存实例
    this.loggerServices.set(cacheKey, loggerService)

    return loggerService
  }

  /**
   * 为Admin模块创建日志器
   */
  createAdminLogger(context?: string): CustomLoggerService {
    return this.createLogger(LogModule.ADMIN, context)
  }

  /**
   * 为Client模块创建日志器
   */
  createClientLogger(context?: string): CustomLoggerService {
    return this.createLogger(LogModule.CLIENT, context)
  }

  /**
   * 为全局模块创建日志器
   */
  createGlobalLogger(context?: string): CustomLoggerService {
    return this.createLogger(LogModule.GLOBAL, context)
  }

  /**
   * 根据上下文自动选择合适的日志器
   * 基于调用栈或上下文信息智能选择模块
   */
  createContextualLogger(context?: string): CustomLoggerService {
    // 获取调用栈信息
    const stack = new Error('Logger context error').stack

    // 根据调用栈判断模块
    if (stack?.includes('/admin/')) {
      return this.createAdminLogger(context)
    } else if (stack?.includes('/client/')) {
      return this.createClientLogger(context)
    } else {
      return this.createGlobalLogger(context)
    }
  }

  /**
   * 清理缓存的日志器实例
   */
  clearCache(): void {
    this.loggerServices.clear()
  }

  /**
   * 获取所有活跃的日志器统计信息
   */
  getLoggerStats(): {
    totalLoggers: number
    moduleLoggers: Record<LogModule, boolean>
    cachedServices: number
  } {
    return {
      totalLoggers: this.loggers.size,
      moduleLoggers: Object.values(LogModule).reduce(
        (acc, module) => {
          acc[module] = this.loggers.has(module)
          return acc
        },
        {} as Record<LogModule, boolean>,
      ),
      cachedServices: this.loggerServices.size,
    }
  }

  /**
   * 关闭所有日志器
   */
  async closeAll(): Promise<void> {
    const closePromises = Array.from(this.loggers.values()).map((logger) => {
      return new Promise<void>((resolve) => {
        logger.close()
      })
    })

    await Promise.all(closePromises)
    this.loggers.clear()
    this.loggerServices.clear()
  }
}
