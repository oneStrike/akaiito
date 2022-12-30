import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IInterceptor {
  request?: (config: AxiosRequestConfig) => Promise<IRequestConfig>
  response?: (response: AxiosResponse) => AxiosResponse
}

export interface IRequestConfig extends AxiosRequestConfig {
  interceptor?: IInterceptor
  showLoading?: boolean
  showError?: boolean
  parseResponse?: <T>(response: AxiosResponse) => errorResponse<T>
}

export interface errorResponse<T> {
  error?: boolean
  desc?: string
  data: T
}
