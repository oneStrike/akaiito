import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import {
  LOG_BUSINESS_KEY,
  LOG_CONTEXT_KEY,
  LOG_MODULE_KEY,
  LOG_PERFORMANCE_KEY,
} from '@/common/decorators/log.decorator'
import { LoggerFactoryService } from '@/common/module/logger/logger-factory.service'
import {
  CustomLoggerService,
  LogContext,
} from '@/common/module/logger/logger.service'
import { LogModule } from '@/config/logger.config'

/**
 * 日志拦截器 - 简化版本
 * 自动记录HTTP请求、响应和性能指标
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // 敏感字段配置
  private readonly sensitiveFields = new Set([
    'authorization',
    'cookie',
    'x-api-key',
    'password',
    'token',
    'secret',
    'key',
  ])

  constructor(
    private readonly loggerFactory: LoggerFactoryService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now()
    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const response = context.switchToHttp().getResponse<FastifyReply>()

    // 简化元数据获取
    const logModule = this.getLogModule(context)
    const logContext = this.getLogContext(context)
    const shouldLogPerformance = this.shouldLogPerformance(context)
    const businessAction = this.getBusinessAction(context)

    // 创建日志器并设置上下文
    const logger = this.loggerFactory.createLogger(logModule, logContext)
    this.setRequestContext(logger, request)

    // 记录请求开始
    logger.debug(`${request.method} ${request.url}`, {
      headers: this.sanitizeData(request.headers),
      query: request.query,
      body: this.sanitizeData(request.body),
    })

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - startTime
        logger.logRequest(
          request.method,
          request.url,
          response.statusCode,
          duration,
        )

        if (shouldLogPerformance) {
          logger.logPerformance(
            `${context.getClass().name}.${context.getHandler().name}`,
            duration,
          )
        }

        if (businessAction) {
          logger.logBusiness(businessAction, 'success', { responseData: data })
        }
      }),
      catchError((error) => {
        const duration = Date.now() - startTime
        logger.error(
          `Request failed: ${request.method} ${request.url}`,
          error.stack,
          {
            statusCode: response.statusCode,
            duration,
            errorMessage: error.message,
            errorResponse: error.response,
          },
        )

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
    const module = this.reflector.getAllAndOverride<LogModule>(LOG_MODULE_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (module) return module

    // 根据路径自动判断
    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const path = request.url
    if (path.startsWith('/api/admin')) return LogModule.ADMIN
    if (path.startsWith('/api/client')) return LogModule.CLIENT
    return LogModule.GLOBAL
  }

  /**
   * 获取日志上下文
   */
  private getLogContext(context: ExecutionContext): string {
    const logContext = this.reflector.getAllAndOverride<string>(
      LOG_CONTEXT_KEY,
      [context.getHandler(), context.getClass()],
    )

    return (
      logContext || `${context.getClass().name}.${context.getHandler().name}`
    )
  }

  /**
   * 是否应该记录性能指标
   */
  private shouldLogPerformance(context: ExecutionContext): boolean {
    return (
      this.reflector.getAllAndOverride<boolean>(LOG_PERFORMANCE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || false
    )
  }

  /**
   * 获取业务操作名称
   */
  private getBusinessAction(context: ExecutionContext): string | null {
    const action = this.reflector.getAllAndOverride<string | boolean>(
      LOG_BUSINESS_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (typeof action === 'string') return action
    if (action) return `${context.getClass().name}.${context.getHandler().name}`
    return null
  }

  /**
   * 设置请求上下文
   */
  private setRequestContext(
    logger: CustomLoggerService,
    request: FastifyRequest,
  ): void {
    const logContext: LogContext = {
      requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ip: this.getClientIp(request),
      userAgent: request.headers['user-agent'],
      method: request.method,
      url: request.url,
      userId: (request.user as any)?.id,
    }

    logger.setLogContext(logContext)
  }

  /**
   * 获取客户端 IP
   */
  private getClientIp(request: FastifyRequest): string {
    const xForwardedFor = request.headers['x-forwarded-for']
    if (typeof xForwardedFor === 'string') {
      return xForwardedFor.split(',')[0].trim()
    }
    if (Array.isArray(xForwardedFor)) {
      return xForwardedFor[0]?.split(',')[0]?.trim() || 'unknown'
    }
    return request.headers['x-real-ip']?.toString() || request.ip || 'unknown'
  }

  /**
   * 清理敏感信息
   */
  private sanitizeData(data: any): any {
    if (!data || typeof data !== 'object') return data

    const result: any = {}
    for (const [key, value] of Object.entries(data)) {
      result[key] = this.sensitiveFields.has(key.toLowerCase())
        ? '[REDACTED]'
        : value
    }
    return result
  }
}
