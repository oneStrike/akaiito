import { httpClient } from '@/utils/request'
import type {
  GetFunPluginTypings,
  CreateFunPluginTypings,
  UpdateFunPluginTypings,
  DeleteFunPluginTypings,
  UpdateFunPluginStatusTypings
} from './funPlugin.d'

export const getFunPluginApi = (
  params?: GetFunPluginTypings['Request']
): Promise<GetFunPluginTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/admin/funPlugin/getFunPlugin',
    params
  })
}

export const createFunPluginApi = (): Promise<
  CreateFunPluginTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/createFunPlugin'
  })
}

export const updateFunPluginApi = (): Promise<
  UpdateFunPluginTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/updateFunPlugin'
  })
}

export const deleteFunPluginApi = (): Promise<
  DeleteFunPluginTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/deleteFunPlugin'
  })
}

export const updateFunPluginStatusApi = (): Promise<
  UpdateFunPluginStatusTypings['Response']
> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/updateFunPluginStatus'
  })
}
