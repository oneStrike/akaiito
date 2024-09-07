import type { Config } from '@/components/libs/typings/config'

export const config: Config = {
  // 尺寸单位 rpx和px
  unit: 'rpx',

  colorScheme: {
    primary: '#e87949',
    light: '#ffbd81',
    success: '#72c348',
    warning: '#f0a020',
    error: '#d03050',
    gray: '#f2f3f5',
    white: '#FFFFFF',
    transparent: 'transparent',
    // 字体颜色
    base: '#18191C',
    info: '#61666D',
    minor: '#9499A0',

    // 背景颜色
    bgColor: '#f5f5f5',
  },

  sizeScheme: {
    xs: 24,
    sm: 28,
    base: 32,
    lg: 36,
    xl: 40,
  },

  tabBarHeight: 50,
}
