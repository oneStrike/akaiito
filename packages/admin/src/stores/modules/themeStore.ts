import { themeConfig } from '@/theme'
import { theme } from 'ant-design-vue'
import { type MappingAlgorithm } from 'ant-design-vue/es/config-provider/context'

export interface ThemeStoreState {
  theme: (typeof themeConfig)[keyof typeof themeConfig] & { algorithm: MappingAlgorithm }
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
    theme: {
      ...themeConfig.turquoise,
      algorithm: theme.defaultAlgorithm,
    },
    menuMode: 'dark',
    pageMode: 'light',
    pageAnim: 'scale',
    fullScreen: false,
    menuCollapsed: false,
  }),

  actions: {
    // 切换暗黑模式或明亮模式
    changeTheme() {
      if (this.pageMode === 'light') {
        this.pageMode = 'dark'
        this.theme.algorithm = theme.darkAlgorithm
      } else {
        this.pageMode = 'light'
        this.theme.algorithm = theme.defaultAlgorithm
      }
    },

    // 进入或推出全屏
    changeFullScreen() {
      this.fullScreen ? document.exitFullscreen() : document.documentElement.requestFullscreen()
      this.fullScreen = !this.fullScreen
    },

    // 修改菜单折叠状态
    changeMenuCollapsed() {
      this.menuCollapsed = !this.menuCollapsed
    },
  },
})
