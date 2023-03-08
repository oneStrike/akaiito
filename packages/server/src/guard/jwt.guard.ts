import { Config, Guard, httpError, IGuard, Inject } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
import { JwtService } from '@midwayjs/jwt'

@Guard()
export class JwtGuard implements IGuard<Context> {
  @Config('whitelist')
  routerWhitelist: string[]

  @Inject()
  jwtService: JwtService

  async canActivate(context: Context): Promise<boolean> {
    if (!this.ignoreUrl(context)) {
      const token = context.get('Authorization')
      if (!token) throw new httpError.UnauthorizedError()
      try {
        context.setAttr('userInfo', await this.jwtService.verify(token))
        return true
      } catch (e) {
        return false
      }
    } else {
      return true
    }
  }

  ignoreUrl(context: Context) {
    let { url } = context
    const openUrlReg = new RegExp('^/?.*open|client/').test(url)
    url = url.split('?')[0]
    return openUrlReg || this.routerWhitelist.includes(url)
  }
}
