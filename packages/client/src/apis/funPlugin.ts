import { httpClient } from '@/utils/request'
import type { GetFunPluginTypings } from './funPlugin.d'

export const getFunPluginApi = (
  params?: GetFunPluginTypings['Request']
): Promise<GetFunPluginTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/client/funPlugin/getFunPlugin',
    params
  })
}
