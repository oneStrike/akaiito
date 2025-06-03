import type { HttpResponseResult } from '@akaiito/types'
import type { HttpHandlerInterceptors } from '@/utils/request/types'

import { config } from '@/config'
import { useMessage } from '@/hooks/useFeedback'
import { useUserStore } from '@/stores/modules/user'
import { HttpHandler } from '@/utils/request/request'

const response: HttpHandlerInterceptors['response'] = (data: any) => {
  const responseData = data.data as HttpResponseResult
  if (responseData.code !== 200) {
    useMessage.error(responseData.message || '未知错误')
    if (responseData.code === 401) {
      // useUserStore().signOut()
    }
    return { error: true, errorInfo: responseData }
  } else {
    return data.config.source ? responseData : responseData.data
  }
}

const request: HttpHandlerInterceptors['request'] = async (conf) => {
  const userStore = useUserStore()
  if (!config.auth.httpWhiteList.includes(conf.url as string)) {
    await userStore.renewToken()
  }
  if (!conf.headers) {
    conf.headers = {}
  }
  conf.headers.authorization = `Bearer ${userStore.token.accessToken}`
  return conf
}
const http = new HttpHandler({
  baseURL: import.meta.env.VITE_BASE_URL,
  interceptors: {
    request,
    response,
  },
})
export const httpHandler: <T>(config: any) => Promise<T> = (config: any) =>
  http.request(config)
