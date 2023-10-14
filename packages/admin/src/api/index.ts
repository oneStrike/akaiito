import { HttpClient } from '@/utils/request'
import type { IterateObject } from '@akaiito/typings/src/global'
import { useMessage } from '@/hooks/useFeedback'
import type { AxiosError } from 'axios'

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

export const httpClient = new HttpClient({
  loading: false,
  baseURL: import.meta.env.VITE_BASE_URL,
  responseInterceptor: response,
  responseInterceptorError: responseError
})
