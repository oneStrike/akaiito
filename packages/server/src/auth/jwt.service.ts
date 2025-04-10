import { Config, Inject, InjectClient, Provide, Scope, ScopeEnum } from '@midwayjs/core'
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager'
import * as crypto from 'crypto'
import { JwtService as InnerJwtService, type JwtConfig } from '@midwayjs/jwt'
import type { JwtPayload } from 'jsonwebtoken'

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class JwtService {
  @InjectClient(CachingFactory, 'default')
  cache: MidwayCache

  @Inject()
  jwt: InnerJwtService

  @Config('jwt')
  jwtConfig: JwtConfig

  // 生成加密证书文件，并存储在缓存当中
  async generateKey() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
      namedCurve: 'P-256', // ES256 使用 P-256 曲线
    })
    await this.cache.set('jwt_encrypt_key', {
      privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' }),
      publicKey: publicKey.export({ type: 'spki', format: 'pem' }),
    })
  }

  // 获取证书内容
  async getKey(type: 'public' | 'private') {
    const { privateKey, publicKey } = (await this.cache.get('jwt_encrypt_key')) as any
    return type === 'public' ? publicKey : privateKey
  }

  async sign(data: JwtPayload & { id: number; purpose: 'admin' | 'app' }, expiresIn?: any) {
    expiresIn = expiresIn || this.jwtConfig.sign.expiresIn
    const privateKey = await this.getKey('private')
    const token = await this.jwt.sign(data, privateKey, {
      algorithm: 'ES256',
      expiresIn,
    })
    if (!data.refresh) {
      await this.cache.set(`user_token_${data.purpose}_${data.id}`, token)
    }
    return token
  }

  async verify(token: string) {
    const publicKey = await this.getKey('public')
    try {
      const { payload } = this.jwt.verifySync(token, publicKey) as any
      const cacheToken = await this.cache.get(`user_token_${payload.purpose}_${payload.id}`)
      return token === cacheToken ? payload : false
    } catch (e) {
      return false
    }
  }

  async renewToken(token: string, refreshToken: string) {
    const [tokenRes, refreshTokenRes] = await Promise.all([this.verify(token), this.verify(refreshToken)])
    if (tokenRes && refreshTokenRes && tokenRes.id === refreshTokenRes.id) {
      return await this.sign(tokenRes)
    } else {
      return false
    }
  }
}
