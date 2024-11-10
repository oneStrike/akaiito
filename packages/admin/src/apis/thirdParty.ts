import { httpClient } from '@/utils/request'
import type { SearchWordTypesRes, SearchWordTypesReq } from './types/thirdParty.d'

/**
 *  接口 [搜索三方库作品](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231962478)
 *  @标签 内容/搜索三方库作品
 *  @方式 GET
 *  @地址 /admin/thirdParty/searchWord
 *  @更新时间 2024-11-10 23:30:00
 */

export const searchWordApi = (params: SearchWordTypesReq): Promise<SearchWordTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/thirdParty/searchWord',
    header: {},
    params,
  })
}
