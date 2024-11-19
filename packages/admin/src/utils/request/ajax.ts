import type { Interceptors, RequestConfig } from '@/utils/request/types'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useMessage } from '@/hooks/useMessage'

export class Ajax {
  instance: AxiosInstance
  baseURL?: string

  constructor(config: AxiosRequestConfig & Interceptors) {
    this.baseURL = config.baseURL ?? ''
    this.instance = axios.create(config)

    if (config.requestInterceptor) {
      this.instance.interceptors.request.use(config.requestInterceptor)
    }
    if (config.responseInterceptor) {
      this.instance.interceptors.response.use(config.responseInterceptor)
    }
  }

  async request<T>(config: RequestConfig): Promise<T> {
    try {
      const response = (await this.instance.request(config)) as any
      if (response.error) {
        useMessage.error(response.errorMessage)
      }
      return response.data
    } catch (err: any) {
      useMessage.error(err.message)
      return Promise.reject(err)
    }
  }

  async get<T>(config: Omit<RequestConfig, 'method'>): Promise<T> {
    return await this.request<T>({ ...config, method: 'GET' })
  }

  async post<T>(config: Omit<RequestConfig, 'method'>): Promise<T> {
    return await this.request<T>({ ...config, method: 'POST' })
  }
}
