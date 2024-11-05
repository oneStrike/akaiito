import { httpClient } from '@/utils/request'
import type {
  CollectComicsTypesRes,
  CollectComicsTypesReq,
  CollectBooksTypesRes,
  CollectPostsTypesRes,
} from './types/collect.d'

/**
 *  接口 [漫画](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229461578)
 *  @标签 书架/漫画
 *  @方式 GET
 *  @地址 /api/v3/member/collect/comics
 *  @更新时间 2024-11-03 00:27:03
 */

export const collectComicsApi = (params: CollectComicsTypesReq): Promise<CollectComicsTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/api/v3/member/collect/comics',
    header: {},
    params,
  })
}

/**
 *  接口 [小说](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229461584)
 *  @标签 书架/小说
 *  @方式 GET
 *  @地址 /api/v3/member/collect/books
 *  @更新时间 2024-11-03 00:26:20
 */

export const collectBooksApi = (): Promise<CollectBooksTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/api/v3/member/collect/books',
    header: {},
  })
}

/**
 *  接口 [写真](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-229461587)
 *  @标签 书架/写真
 *  @方式 GET
 *  @地址 /api/v3/member/collect/posts
 *  @更新时间 2024-11-03 00:26:30
 */

export const collectPostsApi = (): Promise<CollectPostsTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/api/v3/member/collect/posts',
    header: {},
  })
}
