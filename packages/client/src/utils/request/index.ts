import type { RequestOptions } from '@/utils/request/types'
import { basicConfig } from '@/config/basic.config'
import { interceptor } from '@/utils/request/interceptor'
import { EsRequest } from '@/utils/request/request'

const client = new EsRequest({
  baseUrl: basicConfig.BASIC_URL,
  consoleInfo: false,
  interceptor,
})
export const httpClient = <T>(
  config: Omit<RequestOptions, 'baseUrl'>,
): Promise<T> => {
  return client.request(config)
}
