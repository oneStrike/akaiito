import { WinstonModuleOptions } from 'nest-winston'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'

/**
 * 日志级别枚举
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

/**
 * 日志模块类型
 */
export enum LogModule {
  ADMIN = 'admin',
  CLIENT = 'client',
  GLOBAL = 'global',
}

/**
 * 日志配置接口
 */
export interface LoggerConfig {
  level: LogLevel
  enableConsole: boolean
  enableFile: boolean
  enableColors: boolean
  maxFiles: string
  maxSize: string
  datePattern: string
  dirname: string
}

/**
 * 获取环境变量配置
 */
function getLoggerConfig(): LoggerConfig {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return {
    level: isDevelopment ? LogLevel.DEBUG : LogLevel.INFO,
    enableConsole: isDevelopment,
    enableFile: true,
    enableColors: isDevelopment,
    maxFiles: process.env.LOG_MAX_FILES || '14d',
    maxSize: process.env.LOG_MAX_SIZE || '20m',
    datePattern: process.env.LOG_DATE_PATTERN || 'YYYY-MM-DD',
    dirname: process.env.LOG_DIR || './logs',
  }
}

/**
 * 创建控制台传输器
 */
function createConsoleTransport(
  config: LoggerConfig,
): winston.transports.ConsoleTransportInstance {
  return new winston.transports.Console({
    level: config.level,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      config.enableColors
        ? winston.format.colorize()
        : winston.format.uncolorize(),
      winston.format.printf(
        ({ timestamp, level, message, context, trace, requestId, userId }) => {
          const contextStr = context ? `[${context}]` : ''
          const requestIdStr = requestId ? `[${requestId}]` : ''
          const userIdStr = userId ? `[User:${userId}]` : ''
          const traceStr = trace ? `\n${trace}` : ''

          return `${timestamp} ${level} ${contextStr}${requestIdStr}${userIdStr} ${message}${traceStr}`
        },
      ),
    ),
  })
}

/**
 * 创建文件传输器
 */
function createFileTransport(
  config: LoggerConfig,
  module: LogModule,
  level: LogLevel = config.level,
): InstanceType<typeof DailyRotateFile> {
  return new DailyRotateFile({
    level,
    filename: `${config.dirname}/${module}/${level}-%DATE%.log`,
    datePattern: config.datePattern,
    maxSize: config.maxSize,
    maxFiles: config.maxFiles,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.json(),
      winston.format.printf(
        ({
          timestamp,
          level,
          message,
          context,
          trace,
          requestId,
          userId,
          ...meta
        }) => {
          const logEntry = {
            timestamp,
            level,
            message,
            context,
            requestId,
            userId,
            module,
            ...meta,
          }

          if (trace) {
            // @ts-expect-error ignore
            logEntry.trace = trace
          }

          return JSON.stringify(logEntry)
        },
      ),
    ),
  })
}

/**
 * 创建错误文件传输器
 */
function createErrorFileTransport(
  config: LoggerConfig,
  module: LogModule,
): InstanceType<typeof DailyRotateFile> {
  return createFileTransport(config, module, LogLevel.ERROR)
}

/**
 * 创建组合文件传输器
 */
function createCombinedFileTransport(
  config: LoggerConfig,
  module: LogModule,
): InstanceType<typeof DailyRotateFile> {
  return new DailyRotateFile({
    level: config.level,
    filename: `${config.dirname}/${module}/combined-%DATE%.log`,
    datePattern: config.datePattern,
    maxSize: config.maxSize,
    maxFiles: config.maxFiles,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    ),
  })
}

/**
 * 创建特定模块的Winston配置
 */
export function createWinstonConfig(module: LogModule): WinstonModuleOptions {
  const config = getLoggerConfig()
  const transports: winston.transport[] = []

  // 添加控制台传输器（仅开发环境）
  if (config.enableConsole) {
    transports.push(createConsoleTransport(config))
  }

  // 添加文件传输器
  if (config.enableFile) {
    transports.push(
      createCombinedFileTransport(config, module),
      createErrorFileTransport(config, module),
    )
  }

  return {
    level: config.level,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.metadata({
        fillExcept: ['message', 'level', 'timestamp'],
      }),
    ),
    transports,
    // 生产环境可以添加远程日志传输器
    ...(process.env.NODE_ENV === 'production' &&
      {
        // 示例：Sentry集成
        // transports: [...transports, new SentryTransport()]
      }),
  }
}

/**
 * 默认全局日志配置
 */
export const globalLoggerConfig = createWinstonConfig(LogModule.GLOBAL)

/**
 * Admin模块日志配置
 */
export const adminLoggerConfig = createWinstonConfig(LogModule.ADMIN)

/**
 * Client模块日志配置
 */
export const clientLoggerConfig = createWinstonConfig(LogModule.CLIENT)
