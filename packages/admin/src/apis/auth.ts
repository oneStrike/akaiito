import { httpHandler } from '@/utils/request'
import type { PublicKeyTypesRes } from './types/auth.d'

/**
 *  接口 [获取Admin专用RSA公钥](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-305561272)
 *  @标签 管理端认证模块/获取Admin专用RSA公钥
 *  @方式 GET
 *  @地址 /api/admin/auth/publicKey
 *  @更新时间 2025-06-08 21:32:41
 */

export const publicKeyApi = (): Promise<PublicKeyTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/auth/publicKey',
    headers: {},
  })
}
