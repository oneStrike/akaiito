import dayjs from 'dayjs'
import config from '@/config'
import { Plugin } from 'vue'
import { useSystem } from '@/hooks/useSystem'
import { useRouter } from '@/hooks/useRouter'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs

    for (const iterator in config) {
      app.config.globalProperties['$' + iterator] =
        config[iterator as keyof typeof config]
    }

    useSystem.getPages()
    useSystem.getConfigInfo().then((res) => {
      if (useSystem.configInfo().guide && useSystem.firstEntering()) {
        useRouter.reLaunch({
          path: '/guide/guide'
        })
      }
    })
  }
}
