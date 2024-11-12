import { IGuard, MidwayWebRouterService } from '@midwayjs/core'
import type { Context } from '@midwayjs/koa'
import { isAdminRequest, isClientRequest, isOpenRequest } from '@/utils/requestSource'
import { Config, Guard, httpError, Inject } from '@midwayjs/core'
import { JwtService } from '@/auth/jwt.service'
import { CtxAttrEnum } from '@/enum/ctxAttr'

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
    if (!token || !verifyRes) {
      throw new httpError.UnauthorizedError()
    }

    if (verifyRes.purpose === 'admin') {
      if (isAdminRequest(ctx.url) || isOpenRequest(ctx.url)) {
        ctx.setAttr(CtxAttrEnum.ADMIN_USER_INFO, {
          userId: verifyRes.id,
          username: verifyRes.username,
          mobile: verifyRes.mobile,
        })
      }
    } else if (verifyRes.purpose === 'client') {
      if (isClientRequest(ctx.url) || isOpenRequest(ctx.url)) {
        ctx.setAttr(CtxAttrEnum.CLIENT_USER_INFO, {
          userId: verifyRes.id,
          username: verifyRes.username,
          mobile: verifyRes.mobile,
        })
      }
    } else {
      throw new httpError.UnauthorizedError()
    }
    return true
  }

  // 配置忽略鉴权的路由地址
  public permit(ctx: Context): boolean {
    if (Array.isArray(this.whiteList) && this.whiteList.length) {
      return this.whiteList.includes(ctx.request.path)
    }
    return false
  }
}
