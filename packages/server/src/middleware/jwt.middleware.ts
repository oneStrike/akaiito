import { Middleware } from '@midwayjs/core'
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport'
import { JwtStrategy } from '@/strategy/jwt.strategy'

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {}
  }
}
