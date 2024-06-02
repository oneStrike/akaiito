import {
  Config,
  Guard,
  httpError,
  IGuard,
  Inject,
  MidwayWebRouterService
} from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
import { Jwt } from '@/modules/internal/authentication/jwt.service'
import { IterateObject } from '@akaiito/typings/src'

@Guard()
export class AuthGuard implements IGuard<Context> {
  @Inject()
  webRouterService: MidwayWebRouterService

  @Inject()
  jwtService: Jwt

  @Config('jwt.whiteList')
  whiteList: string[]

  async canActivate(ctx: Context) {
    const refreshToken = ctx.headers['refresh_token'] as string
    if (refreshToken && ctx.url.includes('/admin/user/refreshAccessToken')) {
      const payload = await this.jwtService.verify(refreshToken)
      if (typeof payload === 'string' || !payload.refresh) throw Error()
      this.setUserInfoToCtx(ctx, payload)
    } else {
      // 判断下有没有校验信息
      const permit = this.permit(ctx)
      if (!ctx.headers['authorization'] && !permit) {
        throw new httpError.UnauthorizedError()
      }
      if (!permit) {
        const token = ctx.headers['authorization']
        try {
          const payload = await this.jwtService.verify(token)
          if (typeof payload === 'string' || payload.refresh) throw Error()
          this.setUserInfoToCtx(ctx, payload)
        } catch (e) {
          throw new httpError.UnauthorizedError('登录状态失效')
        }
      }
    }
    return true
  }

  setUserInfoToCtx(ctx: Context, payload: IterateObject) {
    ctx.setAttr('summaryUserInfo', {
      userId: payload.id,
      username: payload.username,
      mobile: payload.mobile
    })
  }

  // 配置忽略鉴权的路由地址
  public permit(ctx: Context): boolean {
    if (Array.isArray(this.whiteList) && this.whiteList.length) {
      return this.whiteList.includes(ctx.request.path)
    }
    return false
  }
}
