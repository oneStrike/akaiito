import {
  Inject,
  Middleware,
  httpError,
  Config,
  IMiddleware
} from '@midwayjs/core'
import { Context, NextFunction } from '@midwayjs/koa'
import { Jwt } from '../base/service/jwt.service'
import { IterateObject } from '@akaiito/typings/src'

@Middleware()
export class JwtMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  jwtService: Jwt

  @Config('jwt.whiteList')
  whiteList: string[]

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      const permit = this.permit(ctx)
      if (!ctx.headers['authorization'] && !permit) {
        throw new httpError.UnauthorizedError()
      }
      if (!permit) {
        const token = ctx.headers['authorization']
        try {
          const payload = (await this.jwtService.verify(
            token
          )) as unknown as IterateObject
          ctx.setAttr('userId', payload!.id)
        } catch (e) {
          throw new httpError.UnauthorizedError('登录状态失效')
        }
      }
      await next()
    }
  }

  // 配置忽略鉴权的路由地址
  public permit(ctx: Context): boolean {
    if (Array.isArray(this.whiteList) && this.whiteList.length) {
      return this.whiteList.includes(ctx.request.path)
    }
    return false
  }
}
