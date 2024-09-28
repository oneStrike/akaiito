import { httpClient } from '@/utils/request'
import type { GetLogsTypesRes, GetRequestLogsTypesRes, GetRequestLogsTypesReq } from './types/logs.d'

/**
 *  接口 [获取系统日志](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-130875498)
 *  @标签 open/获取系统日志
 *  @方式 GET
 *  @地址 /admin/logs/getLogs
 *  @更新时间 2023-12-06 00:00:37
 */

export const getLogsApi = (): Promise<GetLogsTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/logs/getLogs',
  })
}

/**
 *  接口 [获取请求日志](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-141609528)
 *  @标签 系统/获取请求日志
 *  @方式 GET
 *  @地址 /admin/logs/getRequestLogs
 *  @更新时间 2024-09-18 00:18:40
 */

export const getRequestLogsApi = (params: GetRequestLogsTypesReq): Promise<GetRequestLogsTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/logs/getRequestLogs',
    params,
  })
}
