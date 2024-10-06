import axios, { type AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'
import type { HttpResponseResult } from '@akaiito/typings/src'
import type {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios'

export type HttpClientOptions = {
  loading?: boolean
  source?: boolean
  requestInterceptor?: (
    config: HttpClientOptions & InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  responseInterceptor?: (
    config: AxiosResponse,
  ) => AxiosResponse | AxiosPromise<HttpResponseResult>
  responseInterceptorError?: (error: AxiosError) => any
} & AxiosRequestConfig

export class HttpClient {
  private readonly options: HttpClientOptions
  private readonly basicOptions: HttpClientOptions = {
    loading: true,
  }

  axiosInst: AxiosInstance
  loading: boolean

  constructor(options: HttpClientOptions) {
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
      HttpClientOptions,
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
            this.options.responseInterceptorError &&
            err.name === 'AxiosError'
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

  get<T>(config: HttpClientOptions): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HttpClientOptions): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}
