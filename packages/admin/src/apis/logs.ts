import { httpClient } from '@/utils/request'
import type { GetLogsTypings, GetRequestLogsTypings } from './logs.d'

export function getLogsApi(): Promise<GetLogsTypings['Response']> {
  return httpClient({
    method: 'GET',
    url: '/admin/logs/getLogs',
  })
}

export function getRequestLogsApi(
  params?: GetRequestLogsTypings['Request'],
): Promise<GetRequestLogsTypings['Response']> {
  return httpClient({
    method: 'GET',
    url: '/admin/logs/getRequestLogs',
    params,
  })
}
