import type { Interceptors, RequestConfig } from '@/utils/request/types'
import { Ajax } from '@/utils/request/ajax'

const interceptors: Interceptors = {
  requestInterceptor(config) {
    return config
  },
  responseInterceptor(data) {
    return {
      error: data.data.code !== 200,
      errorMessage: data.data.message,
      data: data.data.data,
    }
  },
}

export const ajax = new Ajax({
  baseURL: import.meta.env.VITE_BASE_URL,
  ...interceptors,
})

export function httpClient<T>(config: RequestConfig): Promise<T> {
  if (config.method?.toLocaleLowerCase() === 'get') {
    return ajax.get<T>(config)
  } else {
    return ajax.post<T>(config)
  }
}
