import { httpClient } from '@/utils/request'
import type {
  V3registerTypesRes,
  V3registerTypesReq,
  V3loginTypesRes,
  V3loginTypesReq,
  V3commentsTypesRes,
  V3commentsTypesReq,
  V3roastsTypesRes,
  V3roastsTypesReq,
} from './types/v3.d'

/**
 *  接口 [注册](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229394123)
 *  @标签 用户/注册
 *  @方式 POST
 *  @地址 /api/v3/register
 *  @更新时间 2024-11-02 11:44:35
 */

export const v3registerApi = (data: V3registerTypesReq): Promise<V3registerTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/api/v3/register',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [登录](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229415236)
 *  @标签 用户/登录
 *  @方式 POST
 *  @地址 /api/v3/login
 *  @更新时间 2024-11-02 15:34:19
 */

export const v3loginApi = (data: V3loginTypesReq): Promise<V3loginTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/api/v3/login',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  })
}

/**
 *  接口 [获取作品评论](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229938929)
 *  @标签 作品/获取作品评论
 *  @方式 GET
 *  @地址 /api/v3/comments
 *  @更新时间 2024-11-05 09:26:27
 */

export const v3commentsApi = (params: V3commentsTypesReq): Promise<V3commentsTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/api/v3/comments',
    header: {},
    params,
  })
}

/**
 *  接口 [获取某一话评论](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229940124)
 *  @标签 作品/获取某一话评论
 *  @方式 GET
 *  @地址 /api/v3/roasts
 *  @更新时间 2024-11-05 09:26:28
 */

export const v3roastsApi = (params: V3roastsTypesReq): Promise<V3roastsTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/api/v3/roasts',
    header: {},
    params,
  })
}
