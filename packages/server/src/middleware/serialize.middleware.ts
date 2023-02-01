import { IMiddleware, Middleware } from '@midwayjs/core'
import { NextFunction, Context } from '@midwayjs/koa'

/**
 * 净化入参，只保留有效值
 */
@Middleware()
export class SerializeMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const query = ctx.request.query
      if (ctx.method === 'GET' && query) {
        const pureQuery = {}
        for (const queryKey in query) {
          const item = query[queryKey]
          if (item) pureQuery[queryKey] = item
        }
        ctx.request.query = pureQuery
      }
      await next()
    }
  }
}
