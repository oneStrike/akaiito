import { Middleware, IMiddleware } from '@midwayjs/core'
import { NextFunction, Context } from '@midwayjs/koa'
import { LogService } from '../modules/internal/log/log.service'
import { ReportResult } from '@akaiito/typings/src'

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 调用下一个中间件或路由处理函数
      const result = await next()

      // 获取日志服务实例
      const sysLogService = await ctx.requestContext.getAsync(LogService)

      const reportRes: ReportResult = {
        code: 200,
        status: 'success',
        data: result ?? null,
        desc: 'success'
      }

      // 记录日志
      await sysLogService.recordLogs(ctx, reportRes)

      if (result === null) {
        ctx.status = 200
      }

      // 返回给上一个中间件的结果
      return reportRes
    }
  }
}
