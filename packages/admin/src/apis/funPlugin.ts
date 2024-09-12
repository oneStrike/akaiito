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

export const createFunPluginApi = (
  data: CreateFunPluginTypings['Request']
): Promise<CreateFunPluginTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/createFunPlugin',
    data
  })
}

export const updateFunPluginApi = (
  data: UpdateFunPluginTypings['Request']
): Promise<UpdateFunPluginTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/updateFunPlugin',
    data
  })
}

export const deleteFunPluginApi = (
  data: DeleteFunPluginTypings['Request']
): Promise<DeleteFunPluginTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/deleteFunPlugin',
    data
  })
}

export const updateFunPluginStatusApi = (
  data: UpdateFunPluginStatusTypings['Request']
): Promise<UpdateFunPluginStatusTypings['Response']> => {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/updateFunPluginStatus',
    data
  })
}
