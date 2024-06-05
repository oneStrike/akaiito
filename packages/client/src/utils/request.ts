export interface HttpClient {
  method:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
  url: string
  data?: any
  params?: any
  headers?: any
  loading?: boolean
  showError?: boolean
}

export const httpClient = <T>(options: HttpClient): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (options.loading || typeof options.loading !== 'boolean') {
      uni.showLoading({ mask: true })
    }
    console.log(uni.$es)
    const url =
      uni.$es.systemInfo.uniPlatform === 'web'
        ? options.url
        : import.meta.env.VITE_PROXY_PATH + options.url
    uni.request({
      url,
      data: options.params,
      header: options.headers,
      method: options.method,
      success: (res) => {
        const data = res.data as any
        if (data.code === 200) {
          resolve(data.data as T)
        } else {
          if (options.showError || typeof options.showError !== 'boolean') {
            uni.showModal({
              title: '提示',
              content: data.message,
              showCancel: false,
              complete() {
                reject(data)
              }
            })
          }
        }
      },
      complete(res) {
        uni.hideLoading()
      }
    })
  })
}
