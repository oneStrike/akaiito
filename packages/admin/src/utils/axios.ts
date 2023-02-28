import type { AxiosInstance } from 'axios'
import type { RequestConf, Transform } from '@/typings/utils/axios'

export class KAxios {
  private instance: AxiosInstance
  conf: RequestConf

  constructor(conf: RequestConf) {
    this.conf = conf
    this.instance = axios.create(conf)
    if (conf.interceptor) {
      const { request, response, requestError, responseError } =
        conf.interceptor
      if (request) this.instance.interceptors.request.use(request)
      if (response) this.instance.interceptors.response.use(response)
      if (requestError)
        this.instance.interceptors.request.use(undefined, requestError)
      if (responseError)
        this.instance.interceptors.response.use(undefined, responseError)
    }
  }

  request<T = any>(conf: RequestConf & Transform): Promise<T> {
    return new Promise((resolve, reject) => {
      const { requestHook } = conf
      if (requestHook) conf = requestHook(conf)
      if (conf.urlPrefix) {
        conf.url = conf.urlPrefix + conf.url
      } else if (this.conf.urlPrefix) {
        conf.url = this.conf.urlPrefix + conf.url
      }
      this.instance
        .request(conf)
        .then((res) => {
          resolve(res.data as Promise<T>)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(conf: RequestConf & Transform): Promise<T> {
    return this.request({ ...conf, method: 'GET' })
  }
  post<T = any>(conf: RequestConf & Transform): Promise<T> {
    return this.request({ ...conf, method: 'POST' })
  }
}
