import { httpClient } from '@/utils/request'
import type { GetFunPluginDetailTypings, GetFunPluginTypings } from './funPlugin.d'

export function getFunPluginApi(
  params?: GetFunPluginTypings['Request'],
): Promise<GetFunPluginTypings['Response']> {
  return httpClient({
    method: 'GET',
    url: '/client/funPlugin/getFunPlugin',
    params,
  })
}

export function getFunPluginDetailApi(
  params: GetFunPluginDetailTypings['Request'],
): Promise<GetFunPluginDetailTypings['Response']> {
  return httpClient({
    method: 'GET',
    url: '/client/funPlugin/getFunPluginDetail',
    params,
  })
}
