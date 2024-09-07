import { httpClient } from '@/utils/request'
import type { GetLogsTypings } from './logs.d'

export function getLogsApi(): Promise<GetLogsTypings['Response']> {
  return httpClient({
    method: 'GET',
    url: '/admin/logs/getLogs',
  })
}
