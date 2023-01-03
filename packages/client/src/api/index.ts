import { KRequest } from '@/utils/request'
import config from '@/config'

export const ajax = new KRequest({
  baseUrl: config.BASE_URL
})
