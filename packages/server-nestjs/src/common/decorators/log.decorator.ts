import { SetMetadata } from '@nestjs/common'

// 日志级别枚举
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  HTTP = 'http',
  DEBUG = 'debug',
}

// 日志操作类型
export enum LogAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  READ = 'READ',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPLOAD = 'UPLOAD',
  DOWNLOAD = 'DOWNLOAD',
  EXPORT = 'EXPORT',
  IMPORT = 'IMPORT',
}

// 日志配置接口
export interface LogConfig {
  level?: LogLevel
  action?: LogAction
  description?: string
  logRequest?: boolean
  logResponse?: boolean
  logError?: boolean
}

// 日志装饰器常量
export const LOG_METADATA_KEY = 'log_config'

/**
 * 日志装饰器
 * @param config 日志配置
 */
export const Log = (config: LogConfig = {}) => {
  const defaultConfig: LogConfig = {
    level: LogLevel.INFO,
    logRequest: true,
    logResponse: false,
    logError: true,
    ...config,
  }
  return SetMetadata(LOG_METADATA_KEY, defaultConfig)
}

/**
 * 用户操作日志装饰器
 * @param action 操作类型
 * @param description 操作描述
 */
export const UserActionLog = (action: LogAction, description?: string) => {
  return Log({
    level: LogLevel.INFO,
    action,
    description,
    logRequest: true,
    logResponse: false,
    logError: true,
  })
}

/**
 * 管理员操作日志装饰器
 * @param action 操作类型
 * @param description 操作描述
 */
export const AdminActionLog = (action: LogAction, description?: string) => {
  return Log({
    level: LogLevel.INFO,
    action,
    description: `[ADMIN] ${description || action}`,
    logRequest: true,
    logResponse: true,
    logError: true,
  })
}

/**
 * 错误日志装饰器
 * @param description 错误描述
 */
export const ErrorLog = (description?: string) => {
  return Log({
    level: LogLevel.ERROR,
    description,
    logRequest: true,
    logResponse: false,
    logError: true,
  })
}

/**
 * 调试日志装饰器
 * @param description 调试描述
 */
export const DebugLog = (description?: string) => {
  return Log({
    level: LogLevel.DEBUG,
    description,
    logRequest: true,
    logResponse: true,
    logError: true,
  })
}
