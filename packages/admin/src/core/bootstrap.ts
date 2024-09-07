import { useLayoutStore } from '@/stores/modules/layout'
import { utils } from '@/utils'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import type { Plugin } from 'vue'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs

    for (const utilsKey in utils) {
      app.config.globalProperties[`$${utilsKey}`] =
        utils[utilsKey as keyof typeof utils]
    }

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    const layoutStore = useLayoutStore()

    document.documentElement.classList.add(layoutStore.theme)

    layoutStore.fullScreen = !!document.fullscreenElement
    document.addEventListener('fullscreenchange', () => {
      layoutStore.fullScreen = !layoutStore.fullScreen
    })
  },
}
