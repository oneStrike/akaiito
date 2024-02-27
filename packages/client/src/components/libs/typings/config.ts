//主题色以及字体颜色
import type { IterateObject } from '@akaiito/typings/src'

export type ColorScheme = {
  primary?: string
  light?: string
  success?: string
  warning?: string
  error?: string
  gray?: string
  white?: string
  transparent?: string
  //字体颜色
  basis?: string
  info?: string
  minor?: string

  bgColor?: string
} & IterateObject<string>

export interface RouterConfig {
  routerGuard?: (path: string) => Promise<boolean> | boolean // 路由守卫
  routerEnter?: (path: string) => void // 路由跳转成功
  routerWhiteList?: string[]
  prefix?: {
    normal: string
    tabBar: string
  }
}

export interface Config extends RouterConfig {
  unit: 'px' | 'rpx'
  colorScheme: ColorScheme
  tabBarHeight?: number
}
