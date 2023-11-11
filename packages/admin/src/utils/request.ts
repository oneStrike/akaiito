import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError
} from 'axios'
import axios, { type AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'

export type HttpClientOptions = {
  loading?: boolean
  source?: boolean
  requestInterceptor?: (config: HttpClientOptions) => InternalAxiosRequestConfig
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorError?: (error: AxiosError) => any
} & AxiosRequestConfig

export class HttpClient {
  private readonly options: HttpClientOptions
  private readonly basicOptions: HttpClientOptions = {
    loading: true
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
  }

  private request<T>(config: HttpClientOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      if ((config.loading || this.options.loading) && !this.loading) {
        this.loading = true
        ElLoading.service()
      }

      if (config.requestInterceptor) config = config.requestInterceptor(config)
      return this.axiosInst
        .request(config)
        .then((res) => {
          if (config.responseInterceptor) config.responseInterceptor(res)
          resolve(res.data)
        })
        .catch((err) => {
          if (this.options.responseInterceptorError) {
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
