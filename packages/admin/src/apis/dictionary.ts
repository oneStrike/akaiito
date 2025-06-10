import { httpHandler } from '@/utils/request'
import type { CreateTypesRes, CreateTypesReq, PageTypesRes, PageTypesReq } from './types/dictionary.d'

/**
 *  接口 [创建字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-306432782)
 *  @标签 字典管理/创建字典
 *  @方式 POST
 *  @地址 /api/admin/dictionary/create
 *  @更新时间 2025-06-10 00:29:31
 */

export const createApi = (data: CreateTypesReq): Promise<CreateTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/api/admin/dictionary/create',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [分页查询字典](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-306432894)
 *  @标签 字典管理/分页查询字典
 *  @方式 GET
 *  @地址 /api/admin/dictionary/page
 *  @更新时间 2025-06-10 00:29:40
 */

export const pageApi = (params: PageTypesReq): Promise<PageTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/dictionary/page',
    headers: {},
    params,
  })
}
