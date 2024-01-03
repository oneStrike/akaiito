import dayjs from 'dayjs'
import type { Plugin } from 'vue'
import { useLayoutStore } from '@/stores/modules/layout'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { utils } from '@/utils'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs

    for (const utilsKey in utils) {
      app.config.globalProperties['$' + utilsKey] = utils[utilsKey]
    }

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

    const layoutStore = useLayoutStore()

    document.documentElement.classList.add(layoutStore.theme)

    layoutStore.fullScreen = !!document.fullscreenElement
    document.addEventListener('fullscreenchange', function () {
      layoutStore.fullScreen = !layoutStore.fullScreen
    })
  }
}
