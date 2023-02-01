import { Provide, Inject, Config, httpError } from '@midwayjs/core'
import { JwtService } from '@midwayjs/jwt'
@Provide()
export class AuthService {
  @Inject()
  jwt: JwtService

  @Config('jwt')
  jwtConfig

  /**
   * 生成token
   */
  async generateToken(user, isRefresh = false) {
    const { id, username, account, isRoot } = user
    if (!id || !username) {
      throw new httpError.ForbiddenError()
    }
    const tokenInfo = {
      id,
      username,
      account,
      isRoot,
      isRefresh
    }
    const { secret, token } = this.jwtConfig
    const expiresIn = isRefresh ? token.refreshExpire : token.expire
    return this.jwt.sign(tokenInfo, secret, {
      expiresIn
    })
  }
}
