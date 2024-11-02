import { httpClient } from '@/utils/request'
import type { HomeIndex2TypesRes } from './types/h5.d'

/**
 *  接口 [首页](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229433358)
 *  @标签 /首页
 *  @方式 GET
 *  @地址 /api/v3/h5/homeIndex2
 *  @更新时间 2024-11-02 17:32:05
 */

export const homeIndex2Api = (): Promise<HomeIndex2TypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/api/v3/h5/homeIndex2',
    header: {
      'content-type': 'none',
    },
  })
}
