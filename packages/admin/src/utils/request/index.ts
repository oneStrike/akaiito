import { HttpClient, type HttpClientOptions } from '@/utils/request/request'
import type { HttpResponseResult } from '@typings/index'
import { useMessage } from '@/hooks/useFeedback'
import type {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig
} from 'axios'
import { useUserStore } from '@/stores/modules/user'
import { config } from '@/config'

const responseError = (err: AxiosError) => {
  useMessage.error(err.message || '未知错误')
}
const response = (data: any) => {
  const responseData = data.data as HttpResponseResult
  if (responseData.code !== 200) {
    useMessage.error(responseData.desc || '未知错误')
    throw responseData
  } else {
    return data.config.source ? responseData : responseData.data
  }
}

const request: HttpClientOptions['requestInterceptor'] = async (
  conf
): Promise<InternalAxiosRequestConfig> => {
  const userStore = useUserStore()
  let accessToken = userStore.token.accessToken
  if (!accessToken && !config.auth.httpWhiteList.includes(conf.url || '')) {
    try {
      await userStore.refreshAccessToken()
      accessToken = userStore.token.accessToken
    } catch (e) {
      const router = useRouter()
      await router.replace({ name: 'Login' })
      throw new Error('token过期')
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
  responseInterceptorError: responseError
})

export const httpClient = <T>(axiosConfig: AxiosRequestConfig): Promise<T> => {
  if (axiosConfig.method === 'get') {
    return http.get<T>({
      ...axiosConfig
    })
  } else {
    return http.post<T>({
      ...axiosConfig
    })
  }
}
