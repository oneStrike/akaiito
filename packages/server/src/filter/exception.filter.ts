import type { HttpResponseResult } from '@akaiito/types'
import type { MidwayHttpError } from '@midwayjs/core'
import type { Context } from '@midwayjs/koa'
import { Catch } from '@midwayjs/core'
import { prismaErrorMessage } from '@/prisma/errorMessage'
import { OperateLogService } from '@/service/log/operateLog.service'

const prismaError = ['PrismaClientValidationError', 'PrismaClientKnownRequestError']

@Catch()
export class ExceptionFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    const cause = err.cause as any
    const responseErrorInfo = {
      status: 'error',
      data: null,
    } as HttpResponseResult

    ctx.logger.error(err)
    if (prismaError.includes(err.name)) {
      responseErrorInfo.code = 0
      responseErrorInfo.message = prismaErrorMessage(err)
    } else if (cause) {
      if (cause.code === 'ETIMEDOUT' && cause.syscall === 'connect') {
        responseErrorInfo.code = 503
        responseErrorInfo.message = '内部服务请求超时'
      } else {
        responseErrorInfo.code = 0
        const { context, type } = cause.details[0]
        if (type === 'any.required') {
          responseErrorInfo.message = `【 ${context.label} 】参数丢失`
        } else {
          responseErrorInfo.message = `【 ${context.label} 】校验失败！请确认【 ${context.value} 】是否正确`
        }
      }
    } else {
      if (err.name === 'MultipartInvalidFilenameError') err.message = '不受支持的文件类型'
      responseErrorInfo.code = err.status
      switch (err.status) {
        case 400:
          responseErrorInfo.message = err.message
          break
        case 401:
          responseErrorInfo.message = '鉴权信息缺失'
          break
        case 403:
          responseErrorInfo.message = '登陆失效，请重新登陆'
          break
        case 404:
          responseErrorInfo.message = '请求路径错误'
          break
        case 500:
          responseErrorInfo.message = '内部服务错误'
          break
        case 413:
          responseErrorInfo.message = '超出大小限制'
          break
        default:
          responseErrorInfo.code = 0
          responseErrorInfo.message = '未知错误'
      }
    }
    err.status = 200

    const adminRequestLogService = await ctx.requestContext.getAsync(OperateLogService)
    await adminRequestLogService.recordLogs(ctx, responseErrorInfo)
    return responseErrorInfo
  }
}
