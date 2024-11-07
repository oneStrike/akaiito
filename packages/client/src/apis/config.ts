import { httpClient } from '@/utils/request'
import type { Config6000TypesRes } from './types/config.d'

/**
 *  接口 [评论须知](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-230881014)
 *  @标签 作品/评论须知
 *  @方式 GET
 *  @地址 /api/v3/system/config/6000
 *  @更新时间 2024-11-06 21:08:55
 */

export const config6000Api = (): Promise<Config6000TypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/api/v3/system/config/6000',
    header: {},
  })
}
