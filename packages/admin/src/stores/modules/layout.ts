import { useMessage } from '@/hooks/naviaDiscreteApi'
import type { Layout } from '@/typings/stores/layout'

export const layoutStore = defineStore('layout', {
  persist: {
    storage: sessionStorage
  },
  state() {
    return {
      theme: 'light',
      accordion: true,
      collapsed: false,
      fullScreen: false,
      pageAnim: 'scale'
    } as Layout
  },

  actions: {
    //切换菜单折叠状态
    toggleMenuCollapsed() {
      this.collapsed = !this.collapsed
    },

    //切换全屏状态
    toggleFullScreen() {
      const { isSupported, enter, exit } = useFullscreen()
      if (!isSupported.value) {
        useMessage.error('当前浏览器暂不支持全屏浏览')
        return
      }

      this.fullScreen = !this.fullScreen
      this.fullScreen ? enter() : exit()
    },

    //切换暗黑或者明亮模式
    toggleThemeMode(mode?: Layout['theme']) {
      mode = mode || this.theme === 'dark' ? 'light' : 'dark'
      this.theme = mode
    }
  }
})
