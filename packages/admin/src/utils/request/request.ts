import type { HttpResponseResult } from '@akaiito/types'
import type {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'

import { ElLoading } from 'element-plus'

export type HttpHandlerOptions = {
  loading?: boolean
  source?: boolean
  requestInterceptor?: (
    config: HttpHandlerOptions & InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  responseInterceptor?: (
    config: AxiosResponse,
  ) => AxiosResponse | AxiosPromise<HttpResponseResult>
  responseInterceptorError?: (error: AxiosError) => any
} & AxiosRequestConfig

export class HttpHandler {
  private readonly options: HttpHandlerOptions
  private readonly basicOptions: HttpHandlerOptions = {
    loading: true,
  }

  axiosInst: AxiosInstance
  loading: boolean

  constructor(options: HttpHandlerOptions) {
    this.options = Object.assign(this.basicOptions, options)
    this.loading = true
    this.axiosInst = axios.create(this.options)

    if (this.options.requestInterceptor) {
      this.axiosInst.interceptors.request.use(this.options.requestInterceptor)
    }
    if (this.options.responseInterceptor) {
      this.axiosInst.interceptors.response.use(this.options.responseInterceptor)
    }
  }

  private request<T>(
    config: Omit<
      HttpHandlerOptions,
      'requestInterceptor' | 'responseInterceptor' | 'responseInterceptorError'
    >,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      if ((config.loading || this.options.loading) && !this.loading) {
        this.loading = true
        ElLoading.service()
      }

      return this.axiosInst
        .request(config)
        .then((res) => {
          resolve(res as T)
        })
        .catch((err) => {
          if (
            this.options.responseInterceptorError
            && err.name === 'AxiosError'
          ) {
            this.options.responseInterceptorError(err)
          }
          reject(err)
        })
        .finally(() => {
          this.loading = false
        })
    })
  }

  get<T>(config: HttpHandlerOptions): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HttpHandlerOptions): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}
