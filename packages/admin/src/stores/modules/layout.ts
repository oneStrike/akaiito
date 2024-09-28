import type { Layout } from '@/types/stores/layout'

export const useLayoutStore = defineStore('useLayoutStore', {
  persist: {
    storage: sessionStorage,
  },
  state() {
    return {
      theme: 'light',
      accordion: true,
      collapsed: false,
      fullScreen: false,
      pageAnim: 'scale',
    } as Layout
  },

  actions: {
    // 切换菜单折叠状态
    toggleMenuCollapsed() {
      this.collapsed = !this.collapsed
    },

    // 切换全屏状态
    toggleFullScreen() {
      this.fullScreen
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen()
    },

    // 切换暗黑或者明亮模式
    toggleThemeMode(mode?: Layout['theme']) {
      mode = mode || this.theme === 'dark' ? 'light' : 'dark'
      this.theme = mode
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(this.theme)
    },
  },
})
