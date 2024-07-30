import { httpClient } from '@/utils/request'
import type {
  GetFunPluginTypings,
  GetFunPluginDetailTypings
} from './funPlugin.d'

export const getFunPluginApi = (
  params?: GetFunPluginTypings['Request']
): Promise<GetFunPluginTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/client/funPlugin/getFunPlugin',
    params
  })
}

export const getFunPluginDetailApi = (
  params: GetFunPluginDetailTypings['Request']
): Promise<GetFunPluginDetailTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/client/funPlugin/getFunPluginDetail',
    params
  })
}
