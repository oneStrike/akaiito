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
}

export const httpClient = <T>(options: HttpClient): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (options.loading || typeof options.loading !== 'boolean') {
      uni.showLoading({ mask: true })
    }
    uni.request({
      url: options.url,
      data: options.data,
      header: options.headers,
      method: options.method,
      success: (res) => {
        const data = res.data as any
        if (data.code === 200) {
          resolve(data.data as T)
        } else {
          uni.showModal({
            title: '提示',
            content: data.message,
            showCancel: false
          })
        }
      },
      complete() {
        uni.hideLoading()
      }
    })
  })
}
