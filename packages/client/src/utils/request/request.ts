import type { RequestConfig, RequestOptions } from '@/utils/request/types'
import { useModal } from '@/components/libs/hooks/useModal'
import { consoleInfo } from '@/utils/request/consoleInfo'

export class EsRequest {
  baseUrl: RequestConfig['baseUrl']
  timeout: RequestConfig['timeout']
  loading: RequestConfig['loading']
  showError: RequestConfig['showError']
  loadingText: RequestConfig['loadingText']
  interceptor: RequestConfig['interceptor']
  errorPropagation: RequestConfig['errorPropagation']
  handlerError: RequestConfig['handlerError']
  errorModal: boolean | undefined
  consoleInfo: boolean | undefined
  consecutiveRequests: number

  constructor(config: RequestConfig) {
    this.baseUrl = config.baseUrl
    this.timeout = config.timeout || 60000
    this.loading = config.loading ?? true
    this.showError = config.showError ?? true
    this.errorPropagation = config.errorPropagation ?? true
    this.loadingText = config.loadingText || '加载中...'
    this.handlerError = config.handlerError
    this.interceptor = config.interceptor
    this.consoleInfo = config.consoleInfo
    this.consecutiveRequests = 0
    this.errorModal =
      typeof config.errorModal === 'boolean' ? config.errorModal : true
  }

  async request<T>(config: RequestOptions): Promise<T> {
    const errorModal =
      typeof config.errorModal === 'boolean'
        ? config.errorModal
        : this.errorModal

    if (this.interceptor?.request) {
      config = await this.interceptor.request(config)
    }
    if (config.interceptor?.request) {
      config = await config.interceptor.request(config)
    }
    if (this.loading || config.loading) {
      if (this.consecutiveRequests === 0) {
        uni.showLoading({
          mask: true,
          title: config.loadingText || this.loadingText,
        })
      }
      this.consecutiveRequests++
    }

    const baseUrl = config.baseUrl || this.baseUrl
    const fullUrl = baseUrl + config.url
    const params = Object.assign(config.data || {}, config.params || {})
    return new Promise((resolve, reject) => {
      uni.request({
        url: fullUrl,
        method: config.method,
        data: params,
        dataType: config.dataType,
        header: config.header,
        timeout: config.timeout || this.timeout,
        responseType: config.responseType,
        success: (res) => {
          if (this.consoleInfo !== false) {
            consoleInfo(fullUrl, params, res, config.header)
          }

          let responseData
          if (this.interceptor?.response) {
            responseData = this.interceptor.response(res, fullUrl)
          }
          if (config.interceptor?.response) {
            responseData = config.interceptor.response(res, fullUrl)
          }

          if (responseData?.error && errorModal) {
            useModal({
              title: '提示',
              content: responseData.message ?? '',
              showCancel: false,
              success() {
                reject(responseData)
              },
            })
            return
          }
          // @ts-expect-error ignore
          resolve(responseData ? responseData?.data : res?.data?.data)
        },
        complete: (res) => {
          nextTick(() => {
            this.consecutiveRequests--
            if (this.consecutiveRequests === 0) {
              uni.hideLoading()
            }
            if (res.errMsg.includes('request:fail') && errorModal) {
              useModal({
                title: '提示',
                content: res.errMsg,
                showCancel: false,
                success() {
                  reject(res)
                },
              })
            }
          })
        },
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
