import { httpClient } from '@/utils/request'
import type { Config20203TypesRes } from './types/2020.d'

/**
 *  接口 [公告](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229938592)
 *  @标签 系统/公告
 *  @方式 GET
 *  @地址 /api/v3/system/config/2020/3
 *  @更新时间 2024-11-05 09:44:22
 */

export const config20203Api = (): Promise<Config20203TypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/api/v3/system/config/2020/3',
    header: {},
  })
}
