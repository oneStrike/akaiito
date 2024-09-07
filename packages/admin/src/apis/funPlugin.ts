import { httpClient } from '@/utils/request'
import type {
  CreateFunPluginTypings,
  DeleteFunPluginTypings,
  GetFunPluginTypings,
  UpdateFunPluginStatusTypings,
  UpdateFunPluginTypings,
} from './funPlugin.d'

export function getFunPluginApi(
  params?: GetFunPluginTypings['Request'],
): Promise<GetFunPluginTypings['Response']> {
  return httpClient({
    method: 'GET',
    url: '/admin/funPlugin/getFunPlugin',
    params,
  })
}

export function createFunPluginApi(
  data: CreateFunPluginTypings['Request'],
): Promise<CreateFunPluginTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/createFunPlugin',
    data,
  })
}

export function updateFunPluginApi(
  data: UpdateFunPluginTypings['Request'],
): Promise<UpdateFunPluginTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/updateFunPlugin',
    data,
  })
}

export function deleteFunPluginApi(
  data: DeleteFunPluginTypings['Request'],
): Promise<DeleteFunPluginTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/deleteFunPlugin',
    data,
  })
}

export function updateFunPluginStatusApi(
  data: UpdateFunPluginStatusTypings['Request'],
): Promise<UpdateFunPluginStatusTypings['Response']> {
  return httpClient({
    method: 'POST',
    url: '/admin/funPlugin/updateFunPluginStatus',
    data,
  })
}
