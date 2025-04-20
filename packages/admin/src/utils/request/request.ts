import type { HttpHandlerInterceptors } from '@/utils/request/types'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export class HttpHandler {
  axiosInst: AxiosInstance
  interceptors?: HttpHandlerInterceptors

  constructor(options: AxiosRequestConfig & { interceptors?: HttpHandlerInterceptors }) {
    this.axiosInst = axios.create(options)
    this.interceptors = options.interceptors
  }

  async request<T>(config: AxiosRequestConfig & { interceptors?: HttpHandlerInterceptors }): Promise<T> {
    if (this.interceptors?.request) {
      config = await this.interceptors.request(config)
    }
    if (config?.interceptors?.request) {
      config = await config.interceptors.request(config)
    }

    return new Promise((resolve, reject) => {
      this.axiosInst.request(config).then(res => {
        let responseData
        if (this.interceptors?.response) {
          responseData = this.interceptors.response(res)
        }
        if (config?.interceptors?.response) {
          responseData = config.interceptors.response(res)
        }
        if (responseData.error) {
          reject(responseData.errorInfo)
        } else {
          resolve(responseData)
        }
      })
    })
  }
}
