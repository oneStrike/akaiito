import dayjs from 'dayjs'
import type { Plugin } from 'vue'
import { useLayout } from '@/stores'
import config from '@/config'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs

    for (const iterator in config) {
      app.config.globalProperties['$' + iterator] =
        config[iterator as unknown as keyof typeof config]
    }

    document.addEventListener('fullscreenchange', () => {
      useLayout().isFullScreen = document.fullscreenElement !== null
    })

    useLayout().toggleDark()
  }
}
