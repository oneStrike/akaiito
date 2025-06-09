import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { FastifyReply } from 'fastify'

/**
 * HTTP异常过滤器
 * 统一处理应用中的HTTP异常，提供标准化的错误响应格式
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * 错误消息映射表
   * 将系统内部错误消息转换为用户友好的提示信息
   */
  private readonly errorMessageMap: Record<string, string> = {
    // 文件上传相关错误
    'reach files limit': '上传文件数量超出系统限制',
    'request file too large': '上传文件大小超出系统限制',
    'the request is not multipart': '【files】校验错误，上传文件不得为空',
    // 请求体相关错误
    // prettier-ignore
    'Body cannot be empty when content-type is set to \'application/json\'':
      '缺少请求实体',
    // 认证相关错误
    'Unauthorized': '未授权访问，请先登录',
    'Forbidden': '权限不足，无法访问该资源',
    // 验证相关错误
    'Bad Request': '请求参数错误',
    'Validation failed': '数据验证失败',
  }

  /**
   * 数据库错误映射表
   */
  private readonly dbErrorMessageMap: Record<string, string> = {
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
      message: this.getLocalizedErrorMessage(message),
    }
    // 将完整的错误响应添加到response对象上，供日志拦截器使用
    // @ts-expect-error ignore
    response.errorResponse = errorResponse

    response.status(200).send(errorResponse)
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
      return {
        status: exception.getStatus(),
        message: exception.getResponse(),
      }
    }

    // 处理数据库错误
    if (exception instanceof Error && 'code' in exception) {
      const code = (exception as { code?: any }).code
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: this.dbErrorMessageMap[code],
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

  /**
   * 获取本地化错误消息
   */
  private getLocalizedErrorMessage(message: string | object): string {
    let errorMessage = ''

    if (typeof message === 'string') {
      errorMessage = message
    } else if (typeof message === 'object' && message !== null) {
      // 处理ValidationPipe的错误格式
      const msgObj = message as any
      if (Array.isArray(msgObj.message)) {
        errorMessage = msgObj.message.join('; ')
      } else if (typeof msgObj.message === 'string') {
        errorMessage = msgObj.message
      } else if (msgObj.error) {
        errorMessage = msgObj.error
      } else {
        errorMessage = JSON.stringify(message)
      }
    }

    // 应用错误消息映射
    return (
      this.errorMessageMap[errorMessage] || errorMessage || '内部服务器错误'
    )
  }
}
