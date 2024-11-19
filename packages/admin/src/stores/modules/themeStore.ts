import { themeConfig } from '@/theme'

export interface ThemeStoreState {
  theme: (typeof themeConfig)[keyof typeof themeConfig]
  pageMode: 'light' | 'dark'
  fullScreen: boolean
  menuCollapsed: boolean
}

export const useThemeStore = defineStore('useThemeStore', {
  persist: {
    storage: sessionStorage,
  },
  state: (): ThemeStoreState => ({
    theme: themeConfig.turquoise,
    pageMode: 'light',
    fullScreen: false,
    menuCollapsed: false,
  }),

  actions: {
    // 切换暗黑模式或明亮模式
    changeTheme() {},

    // 进入或推出全屏
    changeFullScreen() {},
  },
})
