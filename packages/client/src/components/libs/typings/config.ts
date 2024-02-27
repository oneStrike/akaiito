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

//字体尺寸
export type SizeScheme = {
  tiny?: number
  small?: number
  medium?: number
  large?: number
  huge?: number
  utmost?: number
} & IterateObject<number>

//圆角
export type RadiusScheme = {
  basis?: number
  medium?: number
  large?: number
} & IterateObject<number>
//间距
export type SpaceScheme = {
  basis?: number
  large?: number
} & IterateObject<number>

export interface RouterConfig {
  routerGuard?: (path: string) => Promise<boolean> | boolean // 路由守卫
  routerEnter?: (path: string) => void // 路由跳转成功
  prefix?: {
    normal: string
    tabBar: string
  }
}

export interface Config extends RouterConfig {
  unit: 'px' | 'rpx'
  colorScheme: ColorScheme
  sizeScheme: SizeScheme
  radius: RadiusScheme
  tabBarHeight?: number
  spaceScheme?: SpaceScheme
}
