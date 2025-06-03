import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import {
  LOG_BUSINESS_KEY,
  LOG_CONTEXT_KEY,
  LOG_MODULE_KEY,
  LOG_PERFORMANCE_KEY,
} from '@/common/decorators/log.decorator'
import { LoggerFactoryService } from '@/common/services/logger-factory.service'
import {
  CustomLoggerService,
  LogContext,
} from '@/common/services/logger.service'
import { LogModule } from '@/config/logger.config'

/**
 * 日志拦截器
 * 自动记录HTTP请求、响应和性能指标
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly loggerFactory: LoggerFactoryService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now()
    const request = context.switchToHttp().getRequest<Request>()
    const response = context.switchToHttp().getResponse<Response>()

    // 获取装饰器元数据
    const logModule = this.getLogModule(context)
    const logContext = this.getLogContext(context)
    const shouldLogPerformance = this.shouldLogPerformance(context)
    const businessAction = this.getBusinessAction(context)

    // 创建日志器
    const logger = this.createLogger(logModule, logContext)

    // 设置请求上下文
    this.setRequestContext(logger, request)

    // 记录请求开始
    this.logRequestStart(logger, request)

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - startTime

        // 记录请求完成
        this.logRequestComplete(logger, request, response, duration)

        // 记录性能指标
        if (shouldLogPerformance) {
          this.logPerformance(logger, context, duration)
        }

        // 记录业务操作成功
        if (businessAction) {
          logger.logBusiness(businessAction, 'success', { responseData: data })
        }
      }),
      catchError((error) => {
        const duration = Date.now() - startTime

        // 记录请求错误
        this.logRequestError(logger, request, response, error, duration)

        // 记录业务操作失败
        if (businessAction) {
          logger.logBusiness(businessAction, 'failure', {
            error: error.message,
          })
        }

        throw error
      }),
    )
  }

  /**
   * 获取日志模块
   */
  private getLogModule(context: ExecutionContext): LogModule {
    // 优先从方法级别获取
    let module = this.reflector.get<LogModule>(
      LOG_MODULE_KEY,
      context.getHandler(),
    )

    // 如果方法级别没有，从类级别获取
    if (!module) {
      module = this.reflector.get<LogModule>(LOG_MODULE_KEY, context.getClass())
    }

    // 如果都没有，根据路径自动判断
    if (!module) {
      const request = context.switchToHttp().getRequest<Request>()
      const path = request.path
      if (path.startsWith('/api/admin')) {
        return LogModule.ADMIN
      } else if (path.startsWith('/api/client')) {
        return LogModule.CLIENT
      } else {
        return LogModule.GLOBAL
      }
    }

    return module
  }

  /**
   * 获取日志上下文
   */
  private getLogContext(context: ExecutionContext): string {
    // 优先从方法级别获取
    let logContext = this.reflector.get<string>(
      LOG_CONTEXT_KEY,
      context.getHandler(),
    )

    // 如果方法级别没有，从类级别获取
    if (!logContext) {
      logContext = this.reflector.get<string>(
        LOG_CONTEXT_KEY,
        context.getClass(),
      )
    }

    // 如果都没有，使用控制器和方法名
    if (!logContext) {
      const className = context.getClass().name
      const methodName = context.getHandler().name
      logContext = `${className}.${methodName}`
    }

    return logContext
  }

  /**
   * 是否应该记录性能指标
   */
  private shouldLogPerformance(context: ExecutionContext): boolean {
    return (
      this.reflector.get<boolean>(LOG_PERFORMANCE_KEY, context.getHandler()) ||
      this.reflector.get<boolean>(LOG_PERFORMANCE_KEY, context.getClass()) ||
      false
    )
  }

  /**
   * 获取业务操作名称
   */
  private getBusinessAction(context: ExecutionContext): string | null {
    const action =
      this.reflector.get<string | boolean>(
        LOG_BUSINESS_KEY,
        context.getHandler(),
      ) ||
      this.reflector.get<string | boolean>(LOG_BUSINESS_KEY, context.getClass())

    if (typeof action === 'string') {
      return action
    } else if (action === true) {
      const className = context.getClass().name
      const methodName = context.getHandler().name
      return `${className}.${methodName}`
    }

    return null
  }

  /**
   * 创建日志器
   */
  private createLogger(
    module: LogModule,
    context: string,
  ): CustomLoggerService {
    return this.loggerFactory.createLogger(module, context)
  }

  /**
   * 设置请求上下文
   */
  private setRequestContext(
    logger: CustomLoggerService,
    request: Request,
  ): void {
    const logContext: LogContext = {
      requestId: this.generateRequestId(),
      ip: this.getClientIp(request),
      userAgent: request.get('User-Agent'),
      method: request.method,
      url: request.url,
    }

    // 如果有用户信息，添加用户ID
    if (request.user && (request.user as any).id) {
      logContext.userId = (request.user as any).id
    }

    logger.setLogContext(logContext)
  }

  /**
   * 记录请求开始
   */
  private logRequestStart(logger: CustomLoggerService, request: Request): void {
    logger.debug(`Incoming request: ${request.method} ${request.url}`, {
      headers: this.sanitizeHeaders(request.headers),
      query: request.query,
      body: this.sanitizeBody(request.body),
    })
  }

  /**
   * 记录请求完成
   */
  private logRequestComplete(
    logger: CustomLoggerService,
    request: Request,
    response: Response,
    duration: number,
  ): void {
    logger.logRequest(
      request.method,
      request.url,
      response.statusCode,
      duration,
    )
  }

  /**
   * 记录请求错误
   */
  private logRequestError(
    logger: CustomLoggerService,
    request: Request,
    response: Response,
    error: any,
    duration: number,
  ): void {
    logger.error(
      `Request failed: ${request.method} ${request.url}`,
      error.stack,
      {
        statusCode: response.statusCode,
        duration,
        errorMessage: error.message,
        errorName: error.name,
      },
    )
  }

  /**
   * 记录性能指标
   */
  private logPerformance(
    logger: CustomLoggerService,
    context: ExecutionContext,
    duration: number,
  ): void {
    const className = context.getClass().name
    const methodName = context.getHandler().name
    const operation = `${className}.${methodName}`

    logger.logPerformance(operation, duration)
  }

  /**
   * 生成请求ID
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * 获取客户端IP
   */
  private getClientIp(request: Request): string {
    return ((request.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      request.headers['x-real-ip'] ||
      request.connection?.remoteAddress ||
      request.socket?.remoteAddress ||
      'unknown') as string
  }

  /**
   * 清理敏感的请求头信息
   */
  private sanitizeHeaders(headers: any): any {
    const sanitized = { ...headers }
    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key']

    sensitiveHeaders.forEach((header) => {
      if (sanitized[header]) {
        sanitized[header] = '[REDACTED]'
      }
    })

    return sanitized
  }

  /**
   * 清理敏感的请求体信息
   */
  private sanitizeBody(body: any): any {
    if (!body || typeof body !== 'object') {
      return body
    }

    const sanitized = { ...body }
    const sensitiveFields = ['password', 'token', 'secret', 'key']

    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]'
      }
    })

    return sanitized
  }
}
