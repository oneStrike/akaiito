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
    if (typeof message === 'object') {
      return (message as { message?: string }).message || 'Error'
    } else if (
      message ===
      'Body cannot be empty when content-type is set to \'application/json\''
    ) {
      return '缺少请求实体'
    } else {
      return message || '内部服务错误'
    }
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
    const message = exception.getResponse() as string | object

    const errorResponse = {
      code: status,
      message: this.getErrorMessage(message),
    }

    response.status(status).send(errorResponse)
  }
}
