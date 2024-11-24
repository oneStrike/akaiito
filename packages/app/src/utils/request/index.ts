import type { RequestOptions } from '@/utils/request/types'
import { basicConfig } from '@/config/basic.config'
import { interceptor } from '@/utils/request/interceptor'
import { EsRequest } from '@/utils/request/request'

const esRequest = new EsRequest({
  baseUrl: basicConfig.BASIC_URL,
  consoleInfo: false,
  interceptor,
})
export const httpHandler = <T>(config: Omit<RequestOptions, 'baseUrl'>): Promise<T> => {
  return esRequest.request(config)
}
