import { IGuard, MidwayWebRouterService } from '@midwayjs/core'
import type { Context } from '@midwayjs/koa'
import { isAdminRequest, isClientRequest } from '@/utils/requestSource'
import { Config, Guard, httpError, Inject } from '@midwayjs/core'
import { JwtService } from '@/basic/service/jwt.service'

@Guard()
export class AuthGuard implements IGuard<Context> {
  @Inject()
  webRouterService: MidwayWebRouterService

  @Inject()
  jwtService: JwtService

  @Config('jwt.whiteList')
  whiteList: string[]

  async canActivate(ctx: Context) {
    if (this.permit(ctx)) {
      return true
    }
    const token = ctx.headers.authorization
    const verifyRes = await this.jwtService.verify(token)
    console.log(token, verifyRes)
    if (!token || !verifyRes) {
      throw new httpError.UnauthorizedError()
    }
    if (isAdminRequest(ctx.url) && verifyRes.purpose === 'admin') {
      this.setUserInfoToCtx(ctx, verifyRes)
    } else if (isClientRequest(ctx.url) && verifyRes.purpose === 'client') {
    } else {
      throw new httpError.UnauthorizedError()
    }

    return true
  }

  setUserInfoToCtx(ctx: Context, payload: IterateObject) {
    ctx.setAttr('summaryUserInfo', {
      userId: payload.id,
      username: payload.username,
      mobile: payload.mobile,
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
