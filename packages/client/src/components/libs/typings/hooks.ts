import type { RouterJumpMethodEnum } from '@/components/libs/enum/router'
import type { IterateObject } from '@akaiito/typings/src'

export type Pages = {
  path: string
  name?: string
  meta?: IterateObject
  root?: string
  auth?: string
  tabBar: boolean
  subPage: boolean
} & IterateObject

export interface IRouter {
  path?: string
  name?: string
  query?: IterateObject
  method?: RouterJumpMethodEnum
}

export type RequestResponse = {
  error?: boolean
  desc?: string
  data?: any
}

export type RequestConfig = {
  baseUrl?: string
  timeout?: number
  params?: UniNamespace.RequestOptions['data']
  loading?: boolean
  showError?: boolean
  loadingText?: string
  errorPropagation?: boolean
  errorModal?: boolean
  interceptor?: {
    request?: (config: RequestOptions) => RequestOptions
    response?: (data: any) => RequestResponse
  }
  handlerError?: (data: any) => any
}

export type RequestOptions = RequestConfig & UniNamespace.RequestOptions
