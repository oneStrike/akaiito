import type { FastifyReply } from 'fastify'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

/**
 * HTTP异常过滤器
 * 统一处理应用中的HTTP异常，提供标准化的错误响应格式
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 数据库错误映射表
   */
  private readonly errorMessageMap: Record<string, string> = {
    /** 文件上传错误代码 */
    FST_REQ_FILE_TOO_LARGE: '上传文件大小超出系统限制',
    FST_FILES_LIMIT: '上传文件数量超出系统限制',
    FST_INVALID_MULTIPART_CONTENT_TYPE: '上传文件不得为空',
    /** 数据库错误代码 */
    P2025: '未找到相关记录',
    P2002: '唯一约束失败',
  }

  /**
   * 捕获并处理异常
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()

    const { status, message } = this.extractErrorInfo(exception)
    const errorResponse = {
      code: status,
      message,
    }
    console.log('🚀 ~ HttpExceptionFilter ~ exception:', exception)
    // 将完整的错误响应添加到response对象上，供日志拦截器使用
    // @ts-expect-error ignore
    response.errorResponse = errorResponse

    response.code(200).send(errorResponse)
  }

  /**
   * 提取异常信息
   */
  private extractErrorInfo(exception: unknown): {
    status: number
    message: string | object
    details?: any
  } {
    if (exception instanceof HttpException) {
      const code = exception.getStatus()
      const response = exception.getResponse() as any
      return {
        status: code,
        message: Array.isArray(response?.message)
          ? response.message.join('，')
          : response.message,
      }
    }

    // 处理数据库错误
    if (exception instanceof Error && 'code' in exception) {
      const code = (exception as { code?: any }).code
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: this.errorMessageMap[code],
      }
    }

    // 处理其他类型的异常
    if (exception instanceof Error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message || '内部服务器错误',
      }
    }

    // 未知异常类型
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '未知错误',
    }
  }
}
