import { RequestConfig, RequestOptions } from '@/components/libs/typings/hooks'

export class LkRequest {
  baseUrl: RequestConfig['baseUrl']
  timeout: RequestConfig['timeout']
  loading: RequestConfig['loading']
  showError: RequestConfig['showError']
  loadingText: RequestConfig['loadingText']
  interceptor: RequestConfig['interceptor']
  errorPropagation: RequestConfig['errorPropagation']
  handlerError: RequestConfig['handlerError']
  loadingStatus: boolean

  constructor(config: RequestConfig) {
    this.baseUrl = config.baseUrl
    this.timeout = config.timeout || 5000
    this.loading = config.loading ?? true
    this.showError = config.showError ?? true
    this.errorPropagation = config.errorPropagation ?? true
    this.loadingText = config.loadingText || '加载中...'
    this.handlerError = config.handlerError
    this.interceptor = config.interceptor
    this.loadingStatus = false
  }

  request<T>(config: RequestOptions): Promise<T> {
    if (this.interceptor?.request) {
      config = this.interceptor.request(config)
    }
    if (config.interceptor?.request) {
      config = config.interceptor.request(config)
    }
    if ((this.loading || config.loading) && !this.loadingStatus) {
      this.loadingStatus = true
      uni.showLoading({
        mask: true,
        title: config.loadingText || this.loadingText
      })
    }

    const baseUrl = config.baseUrl || this.baseUrl

    return new Promise((resolve, reject) => {
      uni.request({
        url: baseUrl + config.url,
        method: config.method,
        data: config.data,
        dataType: config.dataType,
        header: config.header,
        timeout: config.timeout || this.timeout,
        responseType: config.responseType,
        success: (res) => {
          const errorPropagation =
            config.errorPropagation ?? this.errorPropagation
          let responseData
          if (this.interceptor?.response) {
            responseData = this.interceptor.response(res.data)
          }
          if (config.interceptor?.response) {
            responseData = config.interceptor.response(res.data)
          }
          if (this.handlerError && responseData?.error) {
            this.handlerError(responseData)
          }

          if (config.handlerError && responseData?.error) {
            config.handlerError(responseData)
          }
          if (responseData?.error && errorPropagation) {
            reject(responseData)
            return
          }
          resolve(responseData as T)
        },
        fail: (err) => {
          reject(err)
        },
        complete: (res) => {
          nextTick(() => {
            this.loadingStatus = false
            uni.hideLoading()
          })
        }
      })
    })
  }

  get<T>(config: RequestOptions) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: RequestOptions) {
    return this.request<T>({ ...config, method: 'POST' })
  }
}
