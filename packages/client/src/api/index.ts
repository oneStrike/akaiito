import { KRequest } from '@/utils/request'
import config from '@/config'

export const ajax = new KRequest({
  baseUrl: config.BASE_URL,
  interceptor: {
    response(data) {
      if (data.data.code !== 1) {
        return {
          error: true,
          desc: data.data.desc,
          data
        }
      }
      return data
    }
  }
})
