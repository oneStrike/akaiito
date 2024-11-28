import type { HttpResponseResult } from '@akaiito/types'
import type { IMiddleware } from '@midwayjs/core'
import type { Context, NextFunction } from '@midwayjs/koa'
import { Middleware } from '@midwayjs/core'
import { RequestLogService } from '@/service/log/requestLog.service'

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 调用下一个中间件或路由处理函数
      const result = await next()

      // 获取日志服务实例
      const adminRequestLogService = await ctx.requestContext.getAsync(RequestLogService)

      const reportRes: HttpResponseResult = {
        code: 200,
        status: 'success',
        data: result ?? null,
        message: 'success',
      }

      // 记录日志
      await adminRequestLogService.recordLogs(ctx, reportRes)

      if (result === null) {
        ctx.status = 200
      }

      // 返回给上一个中间件的结果
      return reportRes
    }
  }
}
