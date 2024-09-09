import type { setConfig } from '@/components/libs/hooks/useConfig'
import type { useModal } from '@/components/libs/hooks/useModal'
import type { EsRouter } from '@/components/libs/hooks/useRouter'
import type { IterateObject } from '@akaiito/typings/src'
import type { Config } from './config'

// 扩展android和ios类型
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
      menuRectInfo: UniApp.GetMenuButtonBoundingClientRectRes | IterateObject
      platform: Platform
      modal: typeof useModal
      router: EsRouter
      setConfig: typeof setConfig
      env: ImportMetaEnv
    }
  }
}
