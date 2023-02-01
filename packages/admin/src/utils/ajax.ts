import type {
  errorResponse,
  Interceptor,
  IRequestConfig
} from '@//typings/utils/ajax'
import type { AxiosInstance } from 'axios'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const SHOW_LOADING = true
const SHOW_ERROR = true

export class Ajax {
  instance: AxiosInstance
  interceptor?: Interceptor
  parseResponse?: IRequestConfig['parseResponse']
  showLoading?: IRequestConfig['showLoading']
  loading?: LoadingInstance | null
  showError?: IRequestConfig['showError']

  constructor(config: IRequestConfig) {
    this.instance = axios.create(config)
    this.interceptor = config.interceptor
    this.parseResponse = config.parseResponse
    this.showLoading = config.showLoading ?? SHOW_LOADING
    this.showError = config.showError ?? SHOW_ERROR
  }

  private async request<T>(config: IRequestConfig): Promise<T> {
    const { interceptor, showError, showLoading } = config
    if (showLoading !== false && this.showLoading && !this.loading) {
      this.loading = ElLoading.service({
        text: 'Loading...',
        lock: true,
        background: 'rgba(0,0,0,0.5)'
      })
    }

    if (this.interceptor?.request) {
      config = await this.interceptor.request(config)
    }

    if (interceptor?.request) {
      config = await interceptor.request(config)
    }
    return new Promise((resolve, reject) => {
      return this.instance
        .request(config)
        .then(async (res) => {
          if (this.interceptor?.response) {
            res = await this.interceptor.response(res)
          }
          if (config.interceptor?.response) {
            res = await config.interceptor?.response(res)
          }
          let result: errorResponse<T>
          if (this.parseResponse) {
            result = this.parseResponse<T>(res)
          } else if (config.parseResponse) {
            result = config.parseResponse<T>(res)
          } else {
            result = res.data
          }
          if (
            result.error &&
            (showError !== false || typeof showError !== 'undefined') &&
            this.showError
          ) {
            ElMessage({
              message: result.desc,
              type: 'error'
            })
            if (this.loading) {
              this.loading.close()
              this.loading = null
            }
            reject(result.data)
            return
          }
          if (this.loading) {
            this.loading.close()
            this.loading = null
          }
          resolve(result.data)
        })
        .catch((err) => {
          ElMessage({
            message: err.message,
            type: 'error'
          })
          if (this.loading) {
            this.loading.close()
            this.loading = null
          }
          reject(err)
        })
    })
  }

  public get<T>(config: IRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  public post<T>(config: IRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }
}
