import { httpHandler } from '@/utils/request'
import type {
  RequestLogPageResponse,
  RequestLogPageRequest,
  RequestLogDetailResponse,
  RequestLogDetailRequest,
} from './types/request-log.d'

/**
 *  接口 [分页查询请求日志](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080030)
 *  @标签 管理端请求日志模块/分页查询请求日志
 *  @方式 GET
 *  @地址 /api/admin/request-log/request-log-page
 *  @更新时间 2025-06-25 22:49:04
 */

export const requestLogPageApi = (params: RequestLogPageRequest): Promise<RequestLogPageResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/request-log/request-log-page',
    headers: {},
    params,
  })
}

/**
 *  接口 [查询请求日志详情](https://apifox.com/apidoc/shared-a9f24650-7b1c-4172-9ff7-bab4a525e590/api-312080031)
 *  @标签 管理端请求日志模块/查询请求日志详情
 *  @方式 GET
 *  @地址 /api/admin/request-log/request-log-detail
 *  @更新时间 2025-06-25 22:49:04
 */

export const requestLogDetailApi = (params: RequestLogDetailRequest): Promise<RequestLogDetailResponse> => {
  return httpHandler({
    method: 'GET',
    url: '/api/admin/request-log/request-log-detail',
    headers: {},
    params,
  })
}
