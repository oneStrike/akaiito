import { Config } from '@/components/libs/typings/config'

export const config: Config = {
  unit: 'px',

  colorScheme: {
    primary: '#ff5844',
    light: '#f7dee3',
    success: '#18a058',
    warning: '#f0a020',
    error: '#d03050',
    gray: '#f2f3f5',
    white: '#FFFFFF',
    transparent: 'transparent',
    //字体颜色
    basis: '#18191C',
    info: '#61666D',
    minor: '#9499A0'
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
  }
}
