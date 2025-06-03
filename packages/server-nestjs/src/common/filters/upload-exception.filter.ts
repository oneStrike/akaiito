import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { MulterError } from 'multer'

/**
 * 文件上传异常过滤器
 * 专门处理文件上传过程中的各种错误
 */
@Catch()
export class UploadExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UploadExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = '文件上传失败'
    let error = 'Internal Server Error'
    let details: any = null

    // 处理 Multer 错误
    if (exception instanceof MulterError) {
      status = HttpStatus.BAD_REQUEST
      error = 'Upload Error'

      switch (exception.code) {
        case 'LIMIT_FILE_SIZE':
          message = '文件大小超出限制'
          details = {
            code: 'FILE_TOO_LARGE',
            maxSize: '10MB',
          }
          break
        case 'LIMIT_FILE_COUNT':
          message = '文件数量超出限制'
          details = {
            code: 'TOO_MANY_FILES',
            maxCount: 5,
          }
          break
        case 'LIMIT_UNEXPECTED_FILE':
          message = '意外的文件字段'
          details = {
            code: 'UNEXPECTED_FIELD',
            field: exception.field,
          }
          break
        case 'LIMIT_PART_COUNT':
          message = '表单部分数量超出限制'
          details = {
            code: 'TOO_MANY_PARTS',
          }
          break
        case 'LIMIT_FIELD_KEY':
          message = '字段名称过长'
          details = {
            code: 'FIELD_NAME_TOO_LONG',
          }
          break
        case 'LIMIT_FIELD_VALUE':
          message = '字段值过长'
          details = {
            code: 'FIELD_VALUE_TOO_LONG',
          }
          break
        case 'LIMIT_FIELD_COUNT':
          message = '字段数量超出限制'
          details = {
            code: 'TOO_MANY_FIELDS',
          }
          break
        default:
          message = `文件上传错误: ${exception.message}`
          details = {
            code: exception.code,
          }
      }
    }
    // 处理 HTTP 异常
    else if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()

      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exception.message
        error = (exceptionResponse as any).error || 'Bad Request'
      } else {
        message = exceptionResponse as string
      }
    }
    // 处理其他错误
    else if (exception instanceof Error) {
      message = exception.message
      error = exception.name

      // 特殊处理文件类型错误
      if (exception.message.includes('不支持的文件类型')) {
        status = HttpStatus.BAD_REQUEST
        error = 'Unsupported File Type'
        details = {
          code: 'UNSUPPORTED_FILE_TYPE',
        }
      }
      // 特殊处理文件验证错误
      else if (exception.message.includes('文件验证失败')) {
        status = HttpStatus.BAD_REQUEST
        error = 'File Validation Failed'
        details = {
          code: 'FILE_VALIDATION_FAILED',
        }
      }
    }

    // 记录错误日志
    this.logger.error(`文件上传异常: ${message}`, {
      url: request.url,
      method: request.method,
      userAgent: request.get('User-Agent'),
      ip: request.ip,
      exception: exception instanceof Error ? exception.stack : exception,
    })

    // 构建响应
    const errorResponse = {
      success: false,
      statusCode: status,
      error,
      message,
      details,
      timestamp: new Date().toISOString(),
      path: request.url,
    }

    response.status(status).json(errorResponse)
  }
}
