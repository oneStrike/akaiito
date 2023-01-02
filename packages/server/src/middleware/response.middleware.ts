import { IMiddleware, Middleware } from '@midwayjs/core'
import { NextFunction, Context } from '@midwayjs/koa'
import { IResponseData } from '../types/dto/list'
import { LogService } from '../modules/admin/log/log.service'

@Middleware()
export class ResponseMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next()
      const responseRes: IResponseData = {
        code: 1,
        status: 'success',
        data: result
      }
      ctx.setAttr('responseRes', responseRes)
      const baseSysLogService = await ctx.requestContext.getAsync(LogService)
      await baseSysLogService.record(ctx)
      return responseRes
    }
  }
}
