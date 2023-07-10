import config from '@/config'
import type { RequestResponse } from '@/components/libs/typings'
import { LkRequest } from '@/components/libs/hooks/useRequest'
import { HttpResponse } from '@/typings'

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
