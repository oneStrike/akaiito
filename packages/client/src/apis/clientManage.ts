import { httpClient } from '@/utils/request'
import type { GetClientSystemConfigTypings } from './clientManage.d'

export function getClientSystemConfigApi(): Promise<
  GetClientSystemConfigTypings['Response']
> {
  return httpClient({
    method: 'GET',
    url: '/client/clientManage/getClientSystemConfig',
  })
}
