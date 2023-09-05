import config from '@/config'
import { router } from '@/router'
import { KAxios } from '@/utils/axios'
import { userStore } from '@/stores'
import type { Interceptot } from '@/typings/utils/ajax'
import type { InternalAxiosRequestConfig } from 'axios'
import { useMessage } from '@/hooks/naviaDiscreteApi'
import { utils } from '@/utils'

const requestInterceptor: Interceptot['request'] = (config) => {
  const useUserStore = userStore()
  const tokenStatus = useUserStore.tokenStatus
  const requestUrl: any = config.url
  if (!utils.isValueInStringEnum(requestUrl, ApiWhiteListEnum)) {
    if (tokenStatus) {
      config.tokenType = config.tokenType || 'token'
      config.headers = {
        ['Authorization']: useUserStore[config.tokenType]
      }
    } else {
      router.replace({ name: 'login' })
      useMessage.error('登录超时，请重新登录')
      window.location.reload()
    }
  }
  return config as InternalAxiosRequestConfig
}

const responseInterceptor: Interceptot['response'] = (res) => {
  if (res.data.type === 'application/octet-stream' && res.status === 200)
    return {
      data: {
        blob: res.data,
        fileName: res.headers.filename
      }
    }
  if (res.data.code === 1) return res.data
  if (res.data.code === 403) {
    useMessage.error('登录失效，等重新登录')
    router.replace({ name: 'login' })
    return
  }
  throw new Error(res.data.desc)
}

const responseErrorInterceptor: Interceptot['responseError'] = (error) => {
  useMessage.error(error.message)
  throw new Error(error.message)
}

const kRequest = new KAxios({
  baseURL: config.BASE_URL,
  timeout: config.TIMEOUT,
  urlPrefix: config.REQUEST_PREFIX,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  interceptor: {
    request: requestInterceptor,
    response: responseInterceptor,
    responseError: responseErrorInterceptor
  }
})

export default kRequest
