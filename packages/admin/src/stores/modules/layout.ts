import type { ILayoutConfig } from '@/typings/layout/config'
import { useDark, useToggle } from '@vueuse/core'
const layoutStore = defineStore('layoutConfig', {
  persist: true,
  state: () => {
    return {
      theme: 'light',
      layoutMode: 'default',
      menuWidth: '260px',
      menuStatus: 'open',
      headerHeight: '50px',
      menuUniqueOpened: false,
      isFullScreen: false,
      isTabs: true
    } as ILayoutConfig
  },

  actions: {
    changeMenuStatus() {
      if (this.menuStatus === 'close') {
        this.menuStatus = 'open'
        this.menuWidth = '260px'
      } else {
        this.menuStatus = 'close'
        this.menuWidth = '64px'
      }
    },

    changeFullScreenStatus() {
      this.isFullScreen = !this.isFullScreen
      this.isFullScreen
        ? document.documentElement.requestFullscreen()
        : document.exitFullscreen()
    },

    changeThemeStatus() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.toggleDark()
    },

    toggleDark() {
      const isDark = useDark()
      isDark.value = this.theme === 'dark'
      useToggle(isDark)
    }
  }
})

export default layoutStore
