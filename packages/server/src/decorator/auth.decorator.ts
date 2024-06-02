import {
  createCustomMethodDecorator,
  IMethodAspect,
  JoinPoint
} from '@midwayjs/core'

export const AUTH_KEY = 'decorator:auth_key'

/**
 * 用户鉴权相关装饰器
 * @constructor
 */
export function Auth(): MethodDecorator {
  return createCustomMethodDecorator(AUTH_KEY, {})
}

export function AuthAspect(): IMethodAspect {
  return {
    async before(joinPoint: JoinPoint) {}
  }
}
