import { HttpClient } from '@/utils/request/request'
import type { IterateObject } from '@typings/index'
import { useMessage } from '@/hooks/useFeedback'
import type { AxiosError, AxiosRequestConfig } from 'axios'

interface ResponseData {
  data: IterateObject
  code: number
  desc: string
  status: 'success' | 'error'
}

const responseError = (err: AxiosError) => {
  useMessage.error(err.message || '未知错误')
}
const response = (data: any) => {
  const responseData = data.data as ResponseData
  if (responseData.code !== 200) {
    useMessage.error(responseData.desc || '未知错误')
    return data
  } else {
    return data.config.source ? responseData : responseData.data
  }
}

const http = new HttpClient({
  loading: false,
  baseURL: import.meta.env.VITE_BASE_URL,
  responseInterceptor: response,
  responseInterceptorError: responseError
})

export const httpClient = <T>(axiosConfig: AxiosRequestConfig): Promise<T> => {
  if (axiosConfig.method === 'GET') {
    return http.get<T>({
      ...axiosConfig
    })
  } else {
    return http.post<T>({
      ...axiosConfig
    })
  }
}
