import type { Config } from './config'
import type { useModal } from '@/components/libs/hooks/useModal'
import { LkRouter } from '@/components/libs/hooks/useRouter'
import { LkRequest } from '@/components/libs/hooks/useRequest'

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

export type ObjType<T = any> = Record<string | symbol, T>

declare global {
  interface Uni {
    $lk: {
      config: Config
      systemInfo: UniNamespace.GetSystemInfoResult
      menuRectInfo: UniApp.GetMenuButtonBoundingClientRectRes
      platform: Platform
      modal: typeof useModal
      router: LkRouter
      http: typeof LkRequest
    }
  }
}
