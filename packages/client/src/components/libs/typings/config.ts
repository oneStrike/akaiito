//主题色以及字体颜色

export interface ColorScheme {
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
}

//字体尺寸
export interface SizeScheme {
  tiny?: number
  small?: number
  medium?: number
  large?: number
  huge?: number
  utmost?: number
}

//圆角
export interface RadiusScheme {
  basis?: number
  medium?: number
  large?: number
}

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
  colorScheme?: ColorScheme
  sizeScheme?: SizeScheme
  radius?: RadiusScheme
}
