import dayjs from 'dayjs'
import { configEnum } from '@/config'
import { Plugin } from 'vue'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs

    for (const iterator in configEnum) {
      app.config.globalProperties['$' + iterator] =
        configEnum[iterator as keyof typeof configEnum]
    }
  }
}
