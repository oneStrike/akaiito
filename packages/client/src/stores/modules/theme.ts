import { ColorScheme, FontColorScheme } from '@/typings/store/theme'

export const themeStore = defineStore('theme', {
  state() {
    return {
      colorScheme: {
        primary: '#ff5844',
        light: '#f7dee3',
        success: '#18a058',
        warning: '#f0a020',
        error: '#d03050',
        gray: '#f2f3f5',
        white: '#FFFFFF',
        transparent: 'transparent'
      } as ColorScheme,

      fontColorScheme: {
        default: '#18191C',
        info: '#61666D',
        minor: '#9499A0'
      } as FontColorScheme,

      sizeScheme: {
        tiny: 12,
        small: 14,
        medium: 16,
        large: 18,
        huge: 20,
        utmost: 24
      }
    }
  },

  getters: {},

  actions: {
    setColorScheme(color: ColorScheme) {
      this.colorScheme = color
    },

    getThemeStyle(type: keyof ColorScheme) {
      let fontColor = '#ffffff'
      if (type === 'transparent' || type === 'gray' || type === 'white') {
        fontColor = this.fontColorScheme.default
      }
      return { color: fontColor, backgroundColor: this.colorScheme[type] }
    }
  }
})
