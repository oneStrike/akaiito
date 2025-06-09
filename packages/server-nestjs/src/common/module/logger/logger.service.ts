import { Injectable, LoggerService as NestLoggerService, Scope } from '@nestjs/common'
import { Logger } from 'winston'
import { LogModule } from '@/config/logger.config'

/**
 * 日志上下文接口
 */
export interface LogContext {
  requestId?: string
  userId?: string
  module?: string
  action?: string
  ip?: string
  userAgent?: string
  [key: string]: any
}

/**
 * 自定义日志服务
 * 提供统一的日志接口，支持上下文信息
 */
@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService implements NestLoggerService {
  private context?: string
  logContext: LogContext = {}

  constructor(
    private readonly logger: Logger,
    private readonly module: LogModule,
  ) {}

  /**
   * 设置日志上下文
   */
  setContext(context: string): void {
    this.context = context
  }

  /**
   * 设置请求上下文信息
   */
  setLogContext(context: LogContext): void {
    this.logContext = { ...this.logContext, ...context }
  }

  /**
   * 清除上下文信息
   */
  clearContext(): void {
    this.logContext = {}
  }

  /**
   * 获取完整的日志元数据
   */
  private getMetadata(meta?: any): any {
    return {
      context: this.context,
      module: this.module,
      ...this.logContext,
      ...meta,
    }
  }

  /**
   * Debug级别日志
   */
  debug(message: string, meta?: any): void {
    this.logger.debug(message, this.getMetadata(meta))
  }

  /**
   * Info级别日志
   */
  log(message: string, meta?: any): void {
    this.logger.info(message, this.getMetadata(meta))
  }

  /**
   * Info级别日志（别名）
   */
  info(message: string, meta?: any): void {
    this.log(message, meta)
  }

  /**
   * Warn级别日志
   */
  warn(message: string, meta?: any): void {
    this.logger.warn(message, this.getMetadata(meta))
  }

  /**
   * Error级别日志
   */
  error(message: string, trace?: string, meta?: any): void {
    this.logger.error(message, {
      ...this.getMetadata(meta),
      trace,
    })
  }

  /**
   * 记录HTTP请求
   */
  logRequest(method: string, url: string, statusCode: number, responseTime: number, meta?: any): void {
    const message = `${method} ${url} ${statusCode} - ${responseTime}ms`

    if (statusCode >= 400) {
      this.error(message, undefined, { type: 'HTTP_REQUEST', ...meta })
    } else {
      this.info(message, { type: 'HTTP_REQUEST', ...meta })
    }
  }

  /**
   * 记录数据库操作
   */
  logDatabase(operation: string, table: string, duration: number, meta?: any): void {
    const message = `DB ${operation} on ${table} - ${duration}ms`
    this.debug(message, { type: 'DATABASE', operation, table, duration, ...meta })
  }

  /**
   * 记录业务操作
   */
  logBusiness(action: string, result: 'success' | 'failure', meta?: any): void {
    const message = `Business action: ${action} - ${result}`

    if (result === 'failure') {
      this.warn(message, { type: 'BUSINESS', action, result, ...meta })
    } else {
      this.info(message, { type: 'BUSINESS', action, result, ...meta })
    }
  }

  /**
   * 记录安全相关事件
   */
  logSecurity(event: string, level: 'info' | 'warn' | 'error', meta?: any): void {
    const message = `Security event: ${event}`
    const logMeta = { type: 'SECURITY', event, ...meta }

    switch (level) {
      case 'info':
        this.info(message, logMeta)
        break
      case 'warn':
        this.warn(message, logMeta)
        break
      case 'error':
        this.error(message, undefined, logMeta)
        break
    }
  }

  /**
   * 记录性能指标
   */
  logPerformance(operation: string, duration: number, meta?: any): void {
    const message = `Performance: ${operation} - ${duration}ms`

    // 超过1秒的操作记录为警告
    if (duration > 1000) {
      this.warn(message, { type: 'PERFORMANCE', operation, duration, slow: true, ...meta })
    } else {
      this.debug(message, { type: 'PERFORMANCE', operation, duration, ...meta })
    }
  }

  /**
   * 创建子日志器（带特定上下文）
   */
  child(context: string, additionalContext?: LogContext): CustomLoggerService {
    const childLogger = new CustomLoggerService(this.logger, this.module)
    childLogger.setContext(context)
    childLogger.setLogContext({ ...this.logContext, ...additionalContext })
    return childLogger
  }
}
