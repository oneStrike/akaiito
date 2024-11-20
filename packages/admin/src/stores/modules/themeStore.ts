import { themeConfig } from '@/theme'

export interface ThemeStoreState {
  theme: (typeof themeConfig)[keyof typeof themeConfig]
  pageMode: 'light' | 'dark'
  menuMode: 'light' | 'dark'
  pageAnim: 'fade' | 'scale'
  fullScreen: boolean
  menuCollapsed: boolean
}

export const useThemeStore = defineStore('useThemeStore', {
  persist: {
    storage: localStorage,
  },
  state: (): ThemeStoreState => ({
    theme: themeConfig.turquoise,
    menuMode: 'dark',
    pageMode: 'light',
    pageAnim: 'scale',
    fullScreen: false,
    menuCollapsed: false,
  }),

  actions: {
    // 切换暗黑模式或明亮模式
    changeTheme() {},

    // 进入或推出全屏
    changeFullScreen() {},

    // 修改菜单折叠状态
    changeMenuCollapsed() {
      this.menuCollapsed = !this.menuCollapsed
    },
  },
})
