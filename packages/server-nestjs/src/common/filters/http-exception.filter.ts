import {
  ArgumentsHost,
  ExceptionFilter,
  Inject,
} from '@nestjs/common'
import type { Request, Response } from 'express'
import {
  Catch,
  HttpException,
} from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

// 注解捕获http异常
@Catch(HttpException)
// 继承自ExceptionFilter过滤器
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // 实现catch方法
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取Http上下文
    const ctx = host.switchToHttp()
    // 获取响应对象
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    // 获取状态码
    const status = exception.getStatus()
    // 获取异常信息
    const exceptionResponse = exception.getResponse() as Record<string, any>

    // 判断是管理端还是客户端请求
    const isAdminRequest = request.url.startsWith('/admin')
    const contextName = isAdminRequest ? 'AdminException' : 'ClientException'

    // 记录异常日志
    this.logger.error(
      `HTTP Exception: ${status} - ${exception.message}`,
      {
        context: contextName,
        statusCode: status,
        url: request.url,
        method: request.method,
        ip: request.ip,
        userAgent: request.headers['user-agent'],
        userId: (request as any).user?.id || 'anonymous',
        exceptionResponse,
        stack: exception.stack,
        timestamp: new Date().toISOString(),
      }
    )

    // 返回错误信息
    response.status(200).json({
      code: status,
      message: exceptionResponse?.statusCode
        ? exceptionResponse.message
        : (exceptionResponse.message?.join(',') ?? exceptionResponse),
    })
  }
}
