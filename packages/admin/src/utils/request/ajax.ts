import type { RequestConfig } from '@/utils/request/types'
import { Axios, type AxiosRequestConfig } from 'axios'

export class Ajax {
  instance: Axios
  baseURL?: string
  timeout?: number
  headers: IterateObject

  constructor(config: AxiosRequestConfig) {
    this.baseURL = config.baseURL ?? ''
    this.timeout = config.timeout ?? 6000
    this.headers = config.headers || {}

    this.instance = new Axios(config)
  }

  async request<T>(config: RequestConfig): Promise<T> {
    try {
      const response = await this.instance.request(config)
      console.log(response)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }

  async get<T>(config: Omit<RequestConfig, 'method'>): Promise<T> {
    return await this.request<T>({ ...config, method: 'GET' })
  }

  async post<T>(config: Omit<RequestConfig, 'method'>): Promise<T> {
    return await this.request<T>({ ...config, method: 'POST' })
  }
}
