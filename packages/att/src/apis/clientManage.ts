import { httpClient } from '@/utils/request'
import type {
  GetClientSystemConfigTypings,
  UpdateClientSystemConfigTypings,
} from './clientManage.d'

export const getClientSystemConfigApi = (): Promise<
  GetClientSystemConfigTypings['Response']
> => {
  return httpClient({
    method: 'GET',
    url: '/admin/clientManage/getClientSystemConfig',
  })
}

export const updateClientSystemConfigApi = (): Promise<
  UpdateClientSystemConfigTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/clientManage/updateClientSystemConfig',
  })
}
