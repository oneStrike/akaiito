import { Config } from '@/components/libs/typings/config'

export const config: Config = {
  //尺寸单位 rpx和px
  unit: 'px',

  colorScheme: {
    primary: '#e87949',
    light: '#ffbd81',
    success: '#72c348',
    warning: '#f0a020',
    error: '#d03050',
    gray: '#f2f3f5',
    white: '#FFFFFF',
    transparent: 'transparent',
    //字体颜色
    basis: '#18191C',
    info: '#61666D',
    minor: '#9499A0',

    //背景颜色
    bgColor: '#f5f5f5'
  },

  //字体尺寸
  sizeScheme: {
    tiny: 12,
    small: 14,
    medium: 16,
    large: 18,
    huge: 20,
    utmost: 24
  },
  //圆角
  radius: {
    basis: 8,
    medium: 16,
    large: 32
  },

  //间距
  spaceScheme: {
    basis: 16,
    large: 32
  },

  tabBarHeight: 50
}
