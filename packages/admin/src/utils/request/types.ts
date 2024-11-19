import type { AxiosRequestConfig } from 'axios'

export interface RequestConfig {
  url: string
  headers?: Record<string, string>
  data?: IterateObject
  params?: IterateObject
  method?: 'POST' | 'GET'
}

export type Interceptors = {
  requestInterceptor?: (config: AxiosRequestConfig) => any
  responseInterceptor?: (res: any) => any
}
