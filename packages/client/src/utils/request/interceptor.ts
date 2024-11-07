import type { EsRequest } from '@/utils/request/request'
import { useCookies } from '@/hooks/useCookies'
import { useRouter } from '@/hooks/useRouter'
import { useUserStore } from '@/stores/modules/user'

export const interceptor: EsRequest['interceptor'] = {
  request: async (config) => {
    config!.header = Object.assign(config?.header ?? {}, {
      'authorization': `Token ${useUserStore().token}`,
      'platform': 3,
      'version': '2.2.5',
      'x-csrf-token': useCookies.get('csrfToken'),
    })
    config!.params = Object.assign(config?.params ?? {}, {
      in_mainland: true,
    })
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
      data: response.data.results,
    }
  },
}
