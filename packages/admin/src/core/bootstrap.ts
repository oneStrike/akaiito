import dayjs from 'dayjs'
import type { Plugin } from 'vue'
import { useLayoutStore } from '@/stores/modules/layout'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs

    const layoutStore = useLayoutStore()

    document.documentElement.classList.add(layoutStore.theme)

    layoutStore.fullScreen = !!document.fullscreenElement
    document.addEventListener('fullscreenchange', function () {
      layoutStore.fullScreen = !layoutStore.fullScreen
    })
  }
}
