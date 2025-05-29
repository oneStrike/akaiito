import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'

// 注解捕获http异常
@Catch(HttpException)
// 继承自ExceptionFilter过滤器
export class HttpExceptionFilter implements ExceptionFilter {
  // 实现catch方法
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取Http上下文
    const ctx = host.switchToHttp()
    // 获取响应对象
    const response = ctx.getResponse<Response>()
    // const request = ctx.getRequest<Request>();
    // 获取状态码
    const status = exception.getStatus()
    // 获取异常信息
    const exceptionResponse = exception.getResponse() as Record<string, any>

    // 返回错误信息
    response.status(status).json({
      code: status,
      message: exceptionResponse.message.join(','),
    })
  }
}
