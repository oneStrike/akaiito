import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { FastifyReply } from 'fastify'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  private getErrorMessage(message: string | object): string {
    let returnMessage: string = ''

    if (typeof message === 'object') {
      // 安全访问 message 字段
      const msg = (message as { message?: string | string[] }).message
      if (typeof msg === 'string') {
        returnMessage = msg
      } else if (Array.isArray(msg)) {
        returnMessage = msg.join(', ') // 统一转为字符串
      }
    } else {
      returnMessage = message
    }

    // 错误消息映射表（可抽取到常量文件中）
    const errorMap: Record<string, string> = {
      'reach files limit': '上传文件数量超出系统限制',
      'request file too large': '上传文件大小超出系统限制',
      'the request is not multipart': '【files】校验错误，上传文件不得为空',
      // prettier-ignore
      'Body cannot be empty when content-type is set to \'application/json\'':
        '缺少请求实体',
    }

    return errorMap[returnMessage] || returnMessage || '内部服务错误'
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
    console.log(exception.message)
    const message = exception?.getResponse
      ? exception?.getResponse()
      : exception

    const errorResponse = {
      code: status,
      message: this.getErrorMessage(message),
    }

    // 将完整的错误响应添加到response对象上，供日志拦截器使用
    // @ts-expect-error ignore
    response.errorResponse = errorResponse

    response.status(status).send(errorResponse)
  }
}
