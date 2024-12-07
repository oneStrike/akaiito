import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HttpHandlerInterceptors {
  request?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
  response?: (response: AxiosResponse) => any
}
