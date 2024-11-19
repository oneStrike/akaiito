import type { Interceptors } from '@/utils/request/types'
import { config } from '@/config'
import { useUserStore } from '@/stores/modules/userStore'

export const interceptors: Interceptors = {
  async requestInterceptor(conf) {
    const userStore = useUserStore()
    if (!config.auth.httpWhiteList.includes(conf.url as string)) {
      await userStore.renewToken()
    }

    if (!conf.headers) {
      conf.headers = {}
    }
    conf.headers.Authorization = userStore.token.accessToken
    return conf
  },
  responseInterceptor(data) {
    if (data.data.code === 401) {
      useUserStore().signOut()
    }
    return {
      error: data.data.code !== 200,
      errorMessage: data.data.message,
      data: data.data.data,
    }
  },
}
