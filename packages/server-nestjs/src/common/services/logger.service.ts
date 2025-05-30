import {
  Global,
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
} from '@nestjs/common'
import { Logger } from 'winston'

@Injectable()
@Global()
export class LoggerService implements NestLoggerService {
  constructor(@Inject('LOGGER') private readonly logger: Logger) {}

  /**
   * 记录普通信息日志
   */
  log(message: any, context?: string) {
    this.logger.info(message, { context })
  }

  /**
   * 记录错误日志
   */
  error(message: any, trace?: string, context?: string) {
    this.logger.error(message, { context, trace })
  }

  /**
   * 记录警告日志
   */
  warn(message: any, context?: string) {
    this.logger.warn(message, { context })
  }

  /**
   * 记录调试日志
   */
  debug(message: any, context?: string) {
    this.logger.debug(message, { context })
  }

  /**
   * 记录详细日志
   */
  verbose(message: any, context?: string) {
    this.logger.debug(message, { context })
  }

  /**
   * 记录HTTP请求日志
   */
  http(message: any, context?: string) {
    this.logger.http(message, { context })
  }

  /**
   * 记录信息日志
   */
  info(message: any, context?: string) {
    this.logger.info(message, { context })
  }

  /**
   * 记录用户操作日志
   */
  logUserAction(
    userId: string,
    action: string,
    details?: any,
    context?: string,
  ) {
    this.logger.info(`User ${userId} performed action: ${action}`, {
      context: context || 'UserAction',
      userId,
      action,
      details,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * 记录API调用日志
   */
  logApiCall(
    method: string,
    url: string,
    statusCode: number,
    responseTime: number,
    userId?: string,
    context?: string,
  ) {
    const level =
      statusCode >= 400 ? 'error' : statusCode >= 300 ? 'warn' : 'http'
    this.logger[level](`${method} ${url} ${statusCode} - ${responseTime}ms`, {
      context: context || 'ApiCall',
      method,
      url,
      statusCode,
      responseTime,
      userId,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * 记录数据库操作日志
   */
  logDatabaseOperation(
    operation: string,
    table: string,
    duration: number,
    context?: string,
  ) {
    this.logger.debug(`Database ${operation} on ${table} - ${duration}ms`, {
      context: context || 'Database',
      operation,
      table,
      duration,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * 记录业务异常日志
   */
  logBusinessError(
    errorCode: string,
    errorMessage: string,
    userId?: string,
    context?: string,
  ) {
    this.logger.error(`Business Error [${errorCode}]: ${errorMessage}`, {
      context: context || 'BusinessError',
      errorCode,
      errorMessage,
      userId,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * 记录系统异常日志
   */
  logSystemError(error: Error, context?: string, additionalInfo?: any) {
    this.logger.error(`System Error: ${error.message}`, {
      context: context || 'SystemError',
      error: error.name,
      message: error.message,
      stack: error.stack,
      additionalInfo,
      timestamp: new Date().toISOString(),
    })
  }
}
