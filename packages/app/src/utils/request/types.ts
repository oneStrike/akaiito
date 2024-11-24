export interface RequestResponse {
  error?: boolean
  desc?: string
  data?: any
  message?: string
}

export type RequestOptions = RequestConfig & UniNamespace.RequestOptions

export interface RequestConfig {
  baseUrl?: string
  timeout?: number
  params?: UniNamespace.RequestOptions['data']
  loading?: boolean
  showError?: boolean
  loadingText?: string
  errorPropagation?: boolean
  errorModal?: boolean
  consoleInfo?: boolean
  interceptor?: {
    request?: AsyncFn<RequestOptions>
    response?: (data: any, url: string) => RequestResponse
  }
  handlerError?: (data: any) => any
  cancelRequest?: boolean
}
