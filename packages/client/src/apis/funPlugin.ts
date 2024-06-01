import { httpClient } from '@/utils/request'
import type { GetFunPluginTypings } from './funPlugin.d'

export const getFunPluginApi = (): Promise<GetFunPluginTypings['Response']> => {
  return httpClient({
    method: 'get',
    url: '/client/funPlugin/getFunPlugin'
  })
}
