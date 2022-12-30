import { KRequest } from '@/utils/request'
import { configEnum } from '@/config'

export const ajax = new KRequest({
  baseUrl: configEnum.BASE_URL
})
