import type { HttpResponseResult } from '@akaiito/types'
import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios'
import { useMessage } from '@/hooks/useFeedback'
import { useUserStore } from '@/stores/modules/user'
import { HttpClient, type HttpClientOptions } from '@/utils/request/request'
import { config } from '@/config'

function responseError(err: AxiosError) {
  useMessage.error(err.message || '未知错误')
}

function response(data: any) {
  const responseData = data.data as HttpResponseResult
  if (responseData.code !== 200 && data.config.errorMessage !== false) {
    useMessage.error(responseData.message || '未知错误')
    if (responseData.code === 401) {
      useUserStore().signOut()
    }
    throw responseData
  } else {
    return data.config.source ? responseData : responseData.data
  }
}

const request: HttpClientOptions['requestInterceptor'] = async (
  conf,
): Promise<InternalAxiosRequestConfig> => {
  const userStore = useUserStore()
  if (!config.auth.httpWhiteList.includes(conf.url as string)) {
    await userStore.renewToken()
  }

  const accessToken = userStore.token.accessToken

  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const item = cookies[i]
    if (item.includes('csrfToken')) {
      conf.headers['x-csrf-token'] = item.split('=')[1]
    }
  }
  conf.headers.authorization = accessToken
  return conf
}

const http = new HttpClient({
  loading: false,
  baseURL: import.meta.env.VITE_BASE_URL,
  requestInterceptor: request,
  responseInterceptor: response,
  responseInterceptorError: responseError,
})

interface extended {
  errorMessage?: boolean
}

export function httpClient<T>(
  axiosConfig: AxiosRequestConfig & extended,
): Promise<T> {
  if (axiosConfig.method?.toLocaleLowerCase() === 'get') {
    return http.get<T>({
      ...axiosConfig,
    })
  } else {
    return http.post<T>({
      ...axiosConfig,
    })
  }
}
