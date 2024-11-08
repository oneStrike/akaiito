import { Inject, InjectClient, Provide } from '@midwayjs/core'
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager'
import * as crypto from 'crypto'
import { JwtService as InnerJwtService } from '@midwayjs/jwt'
import type { JwtPayload } from 'jsonwebtoken'

@Provide()
export class JwtService {
  @InjectClient(CachingFactory, 'default')
  cache: MidwayCache

  @Inject()
  jwt: InnerJwtService

  // 生成加密证书文件，并存储在缓存当中
  async generateKey() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
      namedCurve: 'P-256', // ES256 使用 P-256 曲线
    })
    await this.cache.set('jwt_encrypt_key', {
      privateKey,
      publicKey,
    })
  }

  // 获取证书内容
  async getKey(type: 'public' | 'private') {
    const { privateKey, publicKey } = (await this.cache.get(
      'jwt_encrypt_key',
    )) as any
    return type === 'public'
      ? publicKey.export({ type: 'spki', format: 'pem' })
      : privateKey.export({ type: 'pkcs8', format: 'pem' })
  }

  async sign(payload: JwtPayload) {
    const privateKey = await this.getKey('private')
    return await this.jwt.sign(payload, privateKey, {
      algorithm: 'ES256',
      expiresIn: '2h',
    })
  }

  async verify(token: string) {
    const publicKey = await this.getKey('public')
    try {
      return await this.jwt.verify(token, publicKey)
    } catch (e) {
      return false
    }
  }
}
