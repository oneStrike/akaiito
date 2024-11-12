import type { IMethodAspect, JoinPoint } from '@midwayjs/core'
import { UserService } from '@/modules/admin/user/user.service'
import { ClientUserService } from '@/modules/client/user/user.service'
import { createCustomMethodDecorator, REQUEST_OBJ_CTX_KEY } from '@midwayjs/core'
import { JwtService } from '@/auth/jwt.service'

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
        const jwt = await ctx.requestContext.getAsync(JwtService)
        const payload = await jwt.verify(authorization)
        if (payload) {
          let userInfo = {}
          if (payload.purpost === 'admin') {
            const userService = await ctx.requestContext.getAsync(UserService)
            userInfo = await userService.findUnique({
              where: { id: payload.id },
              omit: {
                password: true,
              },
            })
          } else {
            const clientUserService = await ctx.requestContext.getAsync(ClientUserService)
            userInfo = await clientUserService.findUnique({
              where: { id: payload.id },
              omit: {
                password: true,
              },
            })
          }
          ctx.setAttr('userInfo', userInfo)
        }
      }
    },
  }
}
