import type { EsRequest } from '@/utils/request/request'
import { useRouter } from '@/hooks/useRouter'
import { useUserStore } from '@/stores/modules/user'

export const interceptor: EsRequest['interceptor'] = {
  request: async (config) => {
    config!.header.authorization = `Token ${useUserStore().token}`
    return config
  },
  response: (response, url) => {
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
      data: response.data.results,
    }
  },
}
