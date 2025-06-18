import { httpHandler } from '@/utils/request'
import type { PageTypesRes, PageTypesReq, DetailTypesRes, DetailTypesReq } from './types/request-log.d'

/**
 *  接口 [分页查询请求日志](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-308932298)
 *  @标签 管理端请求日志模块/分页查询请求日志
 *  @方式 GET
 *  @地址 /api/admin/request-log/page
 *  @更新时间 2025-06-18 17:02:21
 */

export const pageApi = (params: PageTypesReq): Promise<PageTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/request-log/page',
    headers: {},
    params,
  })
}

/**
 *  接口 [查询请求日志详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-308932299)
 *  @标签 管理端请求日志模块/查询请求日志详情
 *  @方式 GET
 *  @地址 /api/admin/request-log/detail
 *  @更新时间 2025-06-18 17:02:21
 */

export const detailApi = (params: DetailTypesReq): Promise<DetailTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/request-log/detail',
    headers: {},
    params,
  })
}
