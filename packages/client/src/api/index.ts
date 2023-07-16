import config from '@/config'
import { LkRequest } from '@/components/libs/hooks/useRequest'
import type { HttpResponse } from '@/typings'
import type { RequestResponse } from '@/components/libs/typings/hooks'

export const ajax = new LkRequest({
  baseUrl: config.BASE_URL,
  timeout: 10000,
  interceptor: {
    response(data: HttpResponse): RequestResponse {
      const error = data?.code !== 1
      return {
        error,
        desc: data.desc || error ? '未知错误' : '',
        data: data.data
      }
    }
  },
  handlerError: (data: RequestResponse) => {
    uni.$lk.modal.open({
      title: '错误',
      content: data.desc!
    })
  }
})
