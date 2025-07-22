import type { EsRequest } from '@/utils/request/request'
import { useCookies } from '@/hooks/useCookies'
import { useRouter } from '@/hooks/useRouter'

export const interceptor: EsRequest['interceptor'] = {
  request: async (config) => {
    return config!
  },
  response: (response, url) => {
    useCookies.parse(response.cookies)
    if (response.data.code === 401) {
      useRouter.reLaunch({ name: 'login' })
      throw new Error('token过期')
    }
    if (response.data.code !== 200) {
      return {
        error: true,
        message: response.data.message,
      }
    }
    return {
      data: response.data.data,
    }
  },
}
