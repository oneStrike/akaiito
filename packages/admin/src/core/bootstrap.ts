import dayjs from 'dayjs'
import type { Plugin } from 'vue'
import config from '@/config'
import { useLayoutStore } from '@/stores'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs

    for (const iterator in config) {
      app.config.globalProperties['$' + iterator] =
        config[iterator as unknown as keyof typeof config]
    }
    const layoutStore = useLayoutStore()
    layoutStore.toggleTheme(layoutStore.theme)
  }
}
