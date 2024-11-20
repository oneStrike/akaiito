import { httpClient } from '@/utils/request'
import type {
  ServiceTypesRes,
  SearchWordTypesRes,
  SearchWordTypesReq,
  ParseWordTypesRes,
  ParseWordTypesReq,
} from './types/thirdParty.d'

/**
 *  接口 [获取可用服务商](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-232272788)
 *  @标签 内容/获取可用服务商
 *  @方式 GET
 *  @地址 /admin/thirdParty/service
 *  @更新时间 2024-11-11 16:14:51
 */

export const serviceApi = (): Promise<ServiceTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/thirdParty/service',
    headers: {},
  })
}

/**
 *  接口 [搜索三方库作品](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-231962478)
 *  @标签 内容/搜索三方库作品
 *  @方式 GET
 *  @地址 /admin/thirdParty/searchWord
 *  @更新时间 2024-11-11 16:06:43
 */

export const searchWordApi = (params: SearchWordTypesReq): Promise<SearchWordTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/thirdParty/searchWord',
    headers: {},
    params,
  })
}

/**
 *  接口 [解析三方库作品](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-232205293)
 *  @标签 内容/解析三方库作品
 *  @方式 POST
 *  @地址 /admin/thirdParty/parseWord
 *  @更新时间 2024-11-11 16:08:17
 */

export const parseWordApi = (data: ParseWordTypesReq): Promise<ParseWordTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/thirdParty/parseWord',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
