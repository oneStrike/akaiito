import type { RequestConfig } from '@/utils/request/types'
import { Ajax } from '@/utils/request/ajax'

export const ajax = new Ajax({
  baseURL: import.meta.env.VITE_BASE_URL,
})

export function httpClient<T>(config: RequestConfig): Promise<T> {
  if (config.method?.toLocaleLowerCase() === 'get') {
    return ajax.get<T>(config)
  } else {
    return ajax.post<T>(config)
  }
}
