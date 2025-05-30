import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Request, Response } from 'express'
import { LoggerService } from '../services/logger.service'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now()
    const request = context.switchToHttp().getRequest<Request>()
    const response = context.switchToHttp().getResponse<Response>()

    const { method, url, ip, headers } = request
    const userAgent = headers['user-agent'] || ''
    const userId = (request as any).user?.id || 'anonymous'

    // 判断是管理端还是客户端请求
    const isAdminRequest = url.startsWith('/admin')
    const contextName = isAdminRequest ? 'AdminAPI' : 'ClientAPI'

    // 记录请求开始日志
    this.logger.http(
      `Incoming Request: ${method} ${url}`,
      contextName
    )

    return next.handle().pipe(
      tap({
        next: (data) => {
          const responseTime = Date.now() - startTime
          const statusCode = response.statusCode

          // 记录成功响应日志
          this.logger.logApiCall(
            method,
            url,
            statusCode,
            responseTime,
            userId,
            contextName
          )

          // 记录详细的请求信息（仅在debug模式下）
          if (process.env.NODE_ENV === 'development') {
            this.logger.debug(
              `Request Details: ${JSON.stringify({
                ip,
                userAgent,
                headers: this.sanitizeHeaders(headers),
                body: this.sanitizeBody(request.body),
                query: request.query,
                params: request.params,
              })}`,
              contextName
            )
          }
        },
        error: (error) => {
          const responseTime = Date.now() - startTime
          const statusCode = error.status || 500

          // 记录错误响应日志
          this.logger.logApiCall(
            method,
            url,
            statusCode,
            responseTime,
            userId,
            contextName
          )

          // 记录错误详情
          this.logger.logSystemError(
            error,
            contextName,
            {
              ip,
              userAgent,
              url,
              method,
              userId,
              requestBody: this.sanitizeBody(request.body),
              query: request.query,
              params: request.params,
            }
          )
        },
      })
    )
  }

  /**
   * 清理敏感的请求头信息
   */
  private sanitizeHeaders(headers: any): any {
    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key']
    const sanitized = { ...headers }

    sensitiveHeaders.forEach(header => {
      if (sanitized[header]) {
        sanitized[header] = '***REDACTED***'
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

    const sensitiveFields = ['password', 'token', 'secret', 'key', 'captcha']
    const sanitized = { ...body }

    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '***REDACTED***'
      }
    })

    return sanitized
  }
}
