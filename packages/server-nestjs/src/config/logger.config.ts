import { WinstonModuleOptions } from 'nest-winston'
import * as winston from 'winston'
import { join } from 'path'

// 日志级别
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// 日志颜色配置
const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
}

winston.addColors(logColors)

// 自定义日志格式
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, context, trace, ...meta }) => {
    const contextStr = context ? `[${context}]` : ''
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : ''
    const traceStr = trace ? `\n${trace}` : ''
    return `${timestamp} [${level.toUpperCase()}] ${contextStr} ${message} ${metaStr}${traceStr}`
  })
)

// 控制台日志格式（开发环境）
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
    const contextStr = context ? `[${context}]` : ''
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : ''
    return `${timestamp} ${level} ${contextStr} ${message} ${metaStr}`
  })
)

// 获取日志目录
const getLogDir = () => {
  return join(process.cwd(), 'logs')
}

// 创建文件传输器
const createFileTransport = (filename: string, level?: string) => {
  return new winston.transports.File({
    filename: join(getLogDir(), filename),
    level: level || 'info',
    format: logFormat,
    maxsize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
  })
}

// 管理端日志配置
export const adminLoggerConfig: WinstonModuleOptions = {
  levels: logLevels,
  transports: [
    // 控制台输出（开发环境）
    ...(process.env.NODE_ENV === 'development'
      ? [
          new winston.transports.Console({
            format: consoleFormat,
            level: 'debug',
          }),
        ]
      : []),
    // 管理端所有日志
    createFileTransport('admin/admin.log'),
    // 管理端错误日志
    createFileTransport('admin/admin-error.log', 'error'),
    // 管理端警告日志
    createFileTransport('admin/admin-warn.log', 'warn'),
    // 管理端HTTP请求日志
    createFileTransport('admin/admin-http.log', 'http'),
  ],
  defaultMeta: {
    service: 'admin-service',
    environment: process.env.NODE_ENV || 'development',
  },
}

// 客户端日志配置
export const clientLoggerConfig: WinstonModuleOptions = {
  levels: logLevels,
  transports: [
    // 控制台输出（开发环境）
    ...(process.env.NODE_ENV === 'development'
      ? [
          new winston.transports.Console({
            format: consoleFormat,
            level: 'debug',
          }),
        ]
      : []),
    // 客户端所有日志
    createFileTransport('client/client.log'),
    // 客户端错误日志
    createFileTransport('client/client-error.log', 'error'),
    // 客户端警告日志
    createFileTransport('client/client-warn.log', 'warn'),
    // 客户端HTTP请求日志
    createFileTransport('client/client-http.log', 'http'),
  ],
  defaultMeta: {
    service: 'client-service',
    environment: process.env.NODE_ENV || 'development',
  },
}

// 通用日志配置（用于全局模块）
export const globalLoggerConfig: WinstonModuleOptions = {
  levels: logLevels,
  transports: [
    // 控制台输出（开发环境）
    ...(process.env.NODE_ENV === 'development'
      ? [
          new winston.transports.Console({
            format: consoleFormat,
            level: 'debug',
          }),
        ]
      : []),
    // 全局日志
    createFileTransport('global/global.log'),
    // 全局错误日志
    createFileTransport('global/global-error.log', 'error'),
    // 系统启动日志
    createFileTransport('global/system.log', 'info'),
  ],
  defaultMeta: {
    service: 'global-service',
    environment: process.env.NODE_ENV || 'development',
  },
}
