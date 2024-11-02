// 主题色以及字体颜色
import type { Pages } from '@/components/libs/types/hooks'
import type { IterateObject } from '@/types/global'

export type ColorScheme = {
  primary?: string
  light?: string
  success?: string
  warning?: string
  error?: string
  gray?: string
  white?: string
  transparent?: string
  // 字体颜色
  basis?: string
  info?: string
  minor?: string

  bgColor?: string
} & IterateObject<string>

export type SizeScheme = {
  xs: number
  sm: number
  base: number
  lg: number
  xl: number
} & IterateObject<number>

export interface RouterConfig {
  routerGuard?: (routeInfo: Pages) => Promise<boolean> | boolean // 路由守卫
  routerEnter?: (routeInfo: Pages, query?: IterateObject) => void // 路由跳转成功
  routerWhiteList?: string[]
  prefix?: {
    normal: string
    tabBar: string
  }
}

export interface Config extends RouterConfig {
  unit: 'px' | 'rpx'
  enlarge: number
  colorScheme: ColorScheme
  sizeScheme: SizeScheme
  tabBarHeight?: number
}
