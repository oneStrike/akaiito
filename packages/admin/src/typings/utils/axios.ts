import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

export interface Transform {
  requestHook?: (config: AxiosRequestConfig) => InternalAxiosRequestConfig
  tokenType?: 'token' | 'refreshToken'
}

export interface Interceptor {
  request?: (config: RequestConf & Transform) => InternalAxiosRequestConfig
  response?: (data: AxiosResponse) => any
  requestError?: (error: AxiosError) => void
  responseError?: (error: AxiosError | Error) => void
}

export interface RequestConf extends AxiosRequestConfig {
  interceptor?: Interceptor
  urlPrefix?: string
}
