import { httpClient } from '@/utils/request'
import type { GetLogsTypings, GetRequestLogsTypings } from './logs.d'

export const getLogsApi = (): Promise<GetLogsTypings['Response']> => {
  return httpClient({
    method: 'get',
    url: '/admin/logs/getLogs'
  })
}

export const getRequestLogsApi = (
  params?: GetRequestLogsTypings['Request']
): Promise<GetRequestLogsTypings['Response']> => {
  return httpClient({
    method: 'get',
    url: '/admin/logs/getRequestLogs',
    params
  })
}
