import type { IMethodAspect, JoinPoint } from '@midwayjs/core'
import { UserService } from '@/modules/admin/user/user.service'
import { Jwt } from '@/modules/internal/authentication/jwt.service'
import { createCustomMethodDecorator, REQUEST_OBJ_CTX_KEY } from '@midwayjs/core'

export const USERINFO_KEY = 'decorator:userinfo_key'

/**
 * 获取用户信息装饰器，获取成功后会保存至请求上下文中，Context.getAttr('userInfo')获取
 * @constructor
 */
export function UserInfo(): MethodDecorator {
  return createCustomMethodDecorator(USERINFO_KEY, {})
}

export function getUserInfoHandler(): IMethodAspect {
  return {
    async before(joinPoint: JoinPoint) {
      const instance = joinPoint.target
      const ctx = instance[REQUEST_OBJ_CTX_KEY]
      const authorization = ctx.request.headers.authorization
      if (authorization) {
        const jwtServer = await ctx.requestContext.getAsync(Jwt)
        const userService = await ctx.requestContext.getAsync(UserService)
        const payload = await jwtServer.verify(authorization)
        const userInfo = await userService.findUnique({ id: payload.id })
        ctx.setAttr('userInfo', userInfo)
      }
    },
  }
}
