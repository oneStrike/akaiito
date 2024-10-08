import { Config, Provide, Scope, ScopeEnum } from '@midwayjs/core'
import * as jwt from 'jsonwebtoken'
import type { IterateObject } from '@akaiito/typings/src'
import type { JwtPayload } from 'jsonwebtoken'

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class Jwt {
  @Config('jwt')
  jwtConfig

  async sign(
    payload: string | IterateObject,
    options?: jwt.SignOptions,
    secret?: string,
  ) {
    secret = secret ?? this.jwtConfig.secret
    options = Object.assign(this.jwtConfig.signOptions, options || {})
    return jwt.sign(payload, secret, options)
  }

  async verify(token: string, secretOrPublicKey?: string, options?: jwt.VerifyOptions) {
    const secret = secretOrPublicKey || this.jwtConfig.secret
    const opts = Object.assign(this.jwtConfig.verifyOptions, options)
    const { payload } = jwt.verify(token, secret, opts) as {
      payload: JwtPayload | string
    }
    return payload
  }
}
