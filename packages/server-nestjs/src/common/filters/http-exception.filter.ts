import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Request, Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()

    const response = ctx.getResponse()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
    console.log(exception)
    const message = exception.getResponse() as string | object

    const errorResponse = {
      code: status,
      message:
        typeof message === 'object'
          ? (message as any).message || 'Error'
          : message,
    }

    // 判断是否为 Fastify 平台
    if (httpAdapter.getType() === 'fastify') {
      response.status(status).send(errorResponse)
    } else {
      ctx.getResponse<Response>().status(status).json(errorResponse)
    }
  }
}
