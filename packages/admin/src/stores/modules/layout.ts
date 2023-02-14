import type { Layout } from '@/typings/layout'

import darkThemeCss from 'ant-design-vue/dist/antd.dark.css?raw'
import { useColorMode, useMutationObserver } from '@vueuse/core'

const styleDom = document.createElement('style')
styleDom.dataset.type = 'theme-dark'
styleDom.textContent = darkThemeCss
document.head.appendChild(styleDom)

useMutationObserver(
  document.head,
  (mutations) => {
    const hasCustomStyleEl = mutations.some((n) =>
      Array.from(n.addedNodes).includes(styleDom)
    )
    if (!hasCustomStyleEl) {
      document.head.appendChild(styleDom)
      styleDom.disabled = !document.documentElement.classList.contains('dark')
    }
  },
  {
    childList: true
  }
)

const layoutStore = defineStore('layout', {
  state: () => {
    return {
      theme: useColorMode() as unknown as Layout['theme'],
      fullScreen: false as Layout['fullScreen'],
      menuCollapsed: false as Layout['menuCollapsed'],
      primaryColor: 'rgb(24, 144, 255)' as Layout['primaryColor']
    }
  },
  actions: {
    changeFullScreenStatus() {
      this.fullScreen = !this.fullScreen
      this.fullScreen
        ? document.documentElement.requestFullscreen()
        : document.exitFullscreen()
    },
    changeMenuCollapsed() {
      this.menuCollapsed = !this.menuCollapsed
    },
    changeTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      styleDom.disabled = this.theme !== 'dark'
    }
  }
})
export default layoutStore
