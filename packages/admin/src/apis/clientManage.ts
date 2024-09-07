import { httpClient } from '@/utils/request'
import type {
  GetClientSystemConfigTypings,
  UpdateClientSystemConfigTypings,
} from './clientManage.d'

export function getClientSystemConfigApi(): Promise<
  GetClientSystemConfigTypings['Response']
> {
  return httpClient({
    method: 'GET',
    url: '/admin/clientManage/getClientSystemConfig',
  })
}

export function updateClientSystemConfigApi(
  data: UpdateClientSystemConfigTypings['Request'],
): Promise<UpdateClientSystemConfigTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/clientManage/updateClientSystemConfig',
    data,
  })
}
