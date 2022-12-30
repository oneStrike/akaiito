interface IBasicConfig {
  baseUrl: string
  timeout?: number
  loading?: boolean
  showError?: boolean
  deepData?: boolean
  interceptor?: {
    request: (config: IConfig) => IConfig
    response: (data: any) => any
  }
}

type IConfig = Omit<IBasicConfig, 'baseUrl'> & UniNamespace.RequestOptions

export class KRequest {
  baseUrl: IBasicConfig['baseUrl']
  timeout: IBasicConfig['timeout']
  loading: IBasicConfig['loading']
  showError: IBasicConfig['showError']
  deepData: IBasicConfig['deepData']
  interceptor: IBasicConfig['interceptor']
  loadingStatus: boolean

  constructor(config: IBasicConfig) {
    this.baseUrl = config.baseUrl
    this.timeout = config.timeout || 5000
    this.loading = config.loading ?? true
    this.showError = config.showError ?? true
    this.deepData = config.deepData ?? true
    this.interceptor = config.interceptor
    this.loadingStatus = false
  }

  request<T>(config: IConfig): Promise<T> {
    if (this.interceptor?.request) {
      config = this.interceptor.request(config)
    }
    if (config.interceptor?.request) {
      config = config.interceptor.request(config)
    }
    if ((this.loading || config.loading) && !this.loadingStatus) {
      this.loadingStatus = true
      uni.showLoading({ mask: true, title: '加载中...' })
    }
    return new Promise((resolve, reject) => {
      uni.request({
        url: this.baseUrl + config.url,
        method: config.method,
        data: config.data,
        dataType: config.dataType,
        header: config.header,
        timeout: config.timeout || this.timeout,
        responseType: config.responseType,
        success: (res) => {
          if (this.interceptor?.response) {
            res = this.interceptor.response(res)
          }
          if (config.interceptor?.response) {
            res = config.interceptor.response(res)
          }
          if (config.deepData || this.deepData) {
            const data = res.data as unknown as { data: T }
            resolve(data.data)
          }
          resolve(res.data as T)
        },
        fail: (err) => {
          if (this.showError || config.showError) {
            uni.showModal({
              title: '错误',
              content: err.errMsg,
              showCancel: false,
              success: (res) => {
                reject(err)
              }
            })
          }
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

  get<T>(config: IConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: IConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }
}
