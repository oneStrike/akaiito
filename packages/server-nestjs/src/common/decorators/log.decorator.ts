import { SetMetadata } from '@nestjs/common'
import { LogModule as LoggerConfigModule } from '@/config/logger.config'

/**
 * 日志装饰器元数据键
 */
export const LOG_MODULE_KEY = 'log_module'
export const LOG_CONTEXT_KEY = 'log_context'
export const LOG_PERFORMANCE_KEY = 'log_performance'
export const LOG_BUSINESS_KEY = 'log_business'

/**
 * 日志模块装饰器
 * 用于指定控制器或方法使用的日志模块
 */
export const LogModule = (module: LoggerConfigModule) =>
  SetMetadata(LOG_MODULE_KEY, module)

/**
 * 日志上下文装饰器
 * 用于设置日志上下文信息
 */
export const LogContext = (context: string) =>
  SetMetadata(LOG_CONTEXT_KEY, context)

/**
 * 性能日志装饰器
 * 自动记录方法执行时间
 */
export const LogPerformance = (operation?: string) =>
  SetMetadata(LOG_PERFORMANCE_KEY, operation || true)

/**
 * 业务日志装饰器
 * 自动记录业务操作结果
 */
export const LogBusiness = (action?: string) =>
  SetMetadata(LOG_BUSINESS_KEY, action || true)

/**
 * 组合装饰器：Admin模块日志
 */
export const AdminLog = (context?: string) => {
  return function (
    target: any,
    propertyKey = '',
    descriptor = {
      configurable: true,
      enumerable: true,
      writable: true,
    },
  ) {
    LogModule(LoggerConfigModule.ADMIN)(target, propertyKey, descriptor)
    if (context) {
      LogContext(context)(target, propertyKey, descriptor)
    }
  }
}

/**
 * 组合装饰器：Client模块日志
 */
export const ClientLog = (context?: string) => {
  return function (target: any, propertyKey = '', descriptor = {}) {
    LogModule(LoggerConfigModule.CLIENT)(target, propertyKey, descriptor)
    if (context) {
      LogContext(context)(target, propertyKey, descriptor)
    }
  }
}

/**
 * 组合装饰器：全局模块日志
 */
export const GlobalLog = (context?: string) => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    LogModule(LoggerConfigModule.GLOBAL)(target, propertyKey, descriptor)
    if (context) {
      LogContext(context)(target, propertyKey, descriptor)
    }
  }
}
