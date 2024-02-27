import type { Config } from './config'
import type { useModal } from '@/components/libs/hooks/useModal'
import type { EsRouter } from '@/components/libs/hooks/useRouter'
import type { EsRequest } from '@/components/libs/hooks/useRequest'
import type { setConfig } from '@/components/libs/hooks/useConfig'
import type { IterateObject } from '@akaiito/typings/src'

//扩展android和ios类型
export type Platform =
  | 'android'
  | 'ios'
  | 'web'
  | 'mp-weixin'
  | 'mp-alipay'
  | 'mp-baidu'
  | 'mp-toutiao'
  | 'mp-lark'
  | 'mp-qq'
  | 'mp-kuaishou'
  | 'mp-jd'
  | 'mp-360'
  | 'quickapp-webview'
  | 'quickapp-webview-union'
  | 'quickapp-webview-huawei'

export interface TransformPagesConf {
  includes: string[]
}

declare global {
  interface Uni {
    $es: {
      config: Config
      systemInfo: UniNamespace.GetSystemInfoResult
      menuRectInfo: UniApp.GetMenuButtonBoundingClientRectRes
      platform: Platform
      modal: typeof useModal
      router: EsRouter
      http: typeof EsRequest
      setConfig: typeof setConfig
    }
  }
}

declare const ROUTES: {
  path: string
  name?: string
  meta?: IterateObject
  root?: string
  auth?: string
  tabBar: boolean
  subPage: boolean
}[]
