import type { Layout } from '@/typings/layout'
import { useMessage } from '@/hooks/useMessage'

const layoutStore = defineStore('layout', {
  persist: {
    storage: sessionStorage
  },
  state: () => {
    return {
      theme: 'light',
      fullScreen: false,
      menu: {
        theme: 'light',
        mode: 'vertical',
        accordion: true,
        collapsed: false
      }
    } as Layout
  },
  actions: {
    //切换菜单折叠状态
    toggleMenuCollapsed(status?: boolean) {
      this.menu.collapsed =
        typeof status === 'boolean' ? status : !this.menu.collapsed
    },
    //切换菜单手风琴
    toggleMenuAccordion() {
      this.menu.accordion = !this.menu.accordion
    },
    //切换菜单展示模式
    toggleMenuMode(mode: Layout['menu']['mode']) {
      this.menu.mode = mode
    },
    //切换菜单主题色
    toggleMenuTheme(theme: Layout['menu']['theme']) {
      this.menu.theme = theme
    },
    //切换全屏状态
    toggleFullScreen(status?: boolean) {
      const { isSupported, enter, exit, isFullscreen } = useFullscreen()
      if (!isSupported.value) {
        useMessage.error('当前浏览器暂不支持全屏浏览')
        return
      }
      this.fullScreen =
        typeof status === 'boolean' ? status : !isFullscreen.value
      this.fullScreen ? enter() : exit()
    },
    //切换暗黑和明亮模式
    toggleTheme(theme?: Layout['theme']) {
      this.theme = theme ? theme : this.theme === 'light' ? 'dark' : 'light'
      document.body.setAttribute('arco-theme', this.theme)
    }
  }
})
export default layoutStore
