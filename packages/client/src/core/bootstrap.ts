import dayjs from 'dayjs'
import config from '@/config'
import { Plugin } from 'vue'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs

    for (const iterator in config) {
      app.config.globalProperties['$' + iterator] =
        config[iterator as keyof typeof config]
    }
  }
}
