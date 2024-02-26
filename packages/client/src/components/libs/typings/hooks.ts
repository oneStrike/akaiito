import { RouterJumpMethodEnum } from '@/components/libs/enum/router'
import { ObjType } from '@/components/libs/typings/index'

export type Pages = {
  path: string
  name?: string
  meta?: ObjType
  root?: string
  auth?: string
  tabBar: boolean
  subPage: boolean
} & ObjType

export interface IRouter {
  path: string
  params?: ObjType
  method?: RouterJumpMethodEnum
}

export type RequestResponse = {
  error?: boolean
  desc?: string
  data?: any
}

export type RequestConfig = {
  baseUrl: string
  timeout?: number
  loading?: boolean
  showError?: boolean
  loadingText?: string
  errorPropagation?: boolean
  interceptor?: {
    request?: (config: RequestOptions) => RequestOptions
    response?: (data: any) => RequestResponse
  }
  handlerError?: (data: any) => any
}

export type RequestOptions = RequestConfig & UniNamespace.RequestOptions
