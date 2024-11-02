import type { Config } from '@/components/libs/types/config'

export const config: Config = {
  // 尺寸单位 rpx和px
  unit: 'rpx',

  // 字体放大多少尺寸，会和原有的尺寸相加
  enlarge: 0,

  colorScheme: {
    primary: '#e87949',
    light: '#ffbd81',
    success: '#72c348',
    warning: '#f17f42',
    error: '#f15c5c',
    gray: '#f2f3f5',
    white: '#FFFFFF',
    transparent: 'transparent',
    // 字体颜色
    base: '#18191C',
    info: '#61666D',
    minor: '#9499A0',
    placeholder: '#999999',
    disabled: '#d5d5d5',

    // 背景颜色
    bgColor: '#f5f5f5',
  },

  sizeScheme: {
    'xs': 24,
    'sm': 28,
    'base': 32,
    'lg': 36,
    'xl': 40,
    '2xl': 44,
    '3xl': 48,
    '4xl': 52,
    '5xl': 56,
    '6xl': 60,
  },

  tabBarHeight: 50,
}
