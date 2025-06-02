import { httpHandler } from '@/utils/request'
import type { PublicKeyTypesRes } from './types/login.d'

/**
 *  接口 [获取Login专用RSA公钥](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-303281294)
 *  @标签 管理端认证模块/获取Login专用RSA公钥
 *  @方式 GET
 *  @地址 /api/admin/auth/login/publicKey
 *  @更新时间 2025-06-02 01:14:15
 */

export const publicKeyApi = (): Promise<PublicKeyTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/auth/login/publicKey',
    headers: {},
  })
}
