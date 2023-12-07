import { Catch, MidwayHttpError } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
import type { ReportResult } from '@akaiito/typings/src'
import { LogService } from '../modules/internal/log/log.service'

@Catch()
export class ExceptionFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    const cause = err.cause as any
    const responseErrorInfo = {
      status: 'error',
      data: null
    } as ReportResult
    if (cause) {
      responseErrorInfo.code = 0
      const { context, type } = cause.details[0]
      if (type === 'any.required') {
        responseErrorInfo.desc = `【 ${context.label} 】参数丢失`
      } else {
        responseErrorInfo.desc = `【 ${context.label} 】校验失败！请确认【 ${context.value} 】是否正确`
      }
    } else {
      console.log('🚀 ~ file:exception.filter method:catch line:23 -----', err)
      responseErrorInfo.code = err.status
      switch (err.status) {
        case 400:
          responseErrorInfo.desc = err.message
          break
        case 401:
          responseErrorInfo.desc = '鉴权信息缺失'
          break
        case 403:
          responseErrorInfo.desc = '登陆失效，请重新登陆'
          break
        case 404:
          responseErrorInfo.desc = '请求路径错误'
          break
        case 500:
          responseErrorInfo.desc = '内部服务错误'
          break
        case 413:
          responseErrorInfo.desc = '超出大小限制'
          break
        default:
          responseErrorInfo.code = 0
          responseErrorInfo.desc = '未知错误'
      }
    }
    err.status = 200

    ctx.setAttr('responseRes', responseErrorInfo)
    const baseSysLogService = await ctx.requestContext.getAsync(LogService)
    await baseSysLogService.recordLogs(ctx, responseErrorInfo)
    return responseErrorInfo
  }
}
