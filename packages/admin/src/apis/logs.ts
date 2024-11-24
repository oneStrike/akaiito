import { httpHandler } from '@/utils/request'
import type { GetRequestLogsTypesRes, GetRequestLogsTypesReq } from './types/logs.d'

/**
 *  接口 [获取请求日志](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-141609528)
 *  @标签 系统/获取请求日志
 *  @方式 GET
 *  @地址 /admin/logs/getRequestLogs
 *  @更新时间 2024-11-13 00:22:17
 */

export const getRequestLogsApi = (params: GetRequestLogsTypesReq): Promise<GetRequestLogsTypesRes> => {
  return undefined({
    method: 'GET',
    url: '/admin/logs/getRequestLogs',
    header: {},
    params,
  })
}
