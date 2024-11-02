import type { EsRequest } from '@/utils/request/request'

export const interceptor: EsRequest['interceptor'] = {
  request: async (config) => {
    console.log(config)
    return config
  },
  response: (response, url) => {
    if (response.data.code !== 200) {
      return {
        error: true,
        message: response.data.message,
      }
    }
    return {
      data: response.data.results,
    }
  },
}
