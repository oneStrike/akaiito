import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface Interceptor {
  request?: (config: AxiosRequestConfig) => Promise<IRequestConfig>
  response?: (response: AxiosResponse) => AxiosResponse
}

export interface IRequestConfig extends AxiosRequestConfig {
  interceptor?: Interceptor
  showLoading?: boolean
  showError?: boolean
  parseResponse?: <T>(response: AxiosResponse) => errorResponse<T>
}

export interface errorResponse<T> {
  error?: boolean
  desc?: string
  data: T
}
