import { httpClient } from '@/utils/request'
import type { GetRequestLogTypings } from './system.d'

export const getRequestLogApi = (
  params?: GetRequestLogTypings['Request']
): Promise<GetRequestLogTypings['Response']> => {
  return httpClient({
    method: 'get',
    url: '/admin/system/getRequestLog',
    params
  })
}
