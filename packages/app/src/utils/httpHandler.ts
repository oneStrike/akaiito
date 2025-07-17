import type { RequestOptions } from '@/utils/request/types'
import { basicConfig } from '@/config/basic.config'
import { interceptor } from '@/utils/request/interceptor'
import { EsRequest } from '@/utils/request/request'

const esRequest = new EsRequest({
  baseUrl: basicConfig.BASIC_URL,
  consoleInfo: false,
  interceptor,
})

// 原有的 httpHandler，保持向后兼容
export const httpHandler = <T>(config: Omit<RequestOptions, 'baseUrl'>): Promise<T> => {
  return esRequest.request(config)
}

// Orval 专用的 httpHandler，适配 Orval 的调用方式
export default function orvalHttpHandler<T = any>(
  config: {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    params?: Record<string, any>
    data?: any
    headers?: Record<string, string>
  },
): Promise<T> {
  // 将 Orval 的配置转换为我们的 RequestOptions 格式
  const requestConfig: Omit<RequestOptions, 'baseUrl'> = {
    url: config.url,
    method: config.method,
    header: config.headers || {},
  }

  // 根据请求方法处理参数
  if (config.method === 'GET' && config.params) {
    // GET 请求使用 params
    requestConfig.params = config.params
  } else if (config.data) {
    // POST/PUT/PATCH 请求使用 data
    requestConfig.data = config.data
  }

  return esRequest.request(requestConfig)
}
