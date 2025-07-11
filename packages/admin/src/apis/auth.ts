import { httpHandler } from '@/utils/request'
import type { PublicKeyResponse } from './types/auth.d'

/**
 *  接口 [获取Admin专用RSA公钥](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-317836340)
 *  @标签 管理端认证模块/获取Admin专用RSA公钥
 *  @方式 GET
 *  @地址 /api/admin/auth/public-key
 *  @更新时间 2025-07-11 11:36:40
 */

export const publicKeyApi = (): Promise<PublicKeyResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/auth/public-key',
    headers: {},
  })
}
