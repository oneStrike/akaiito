import { filePath } from '@/utils/filePath'
import dayjs from 'dayjs'
import type { Plugin } from 'vue'
import { useSystemConfigStore } from '@/stores/modules/systemConfig'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$filePath = filePath

    useSystemConfigStore().getSystemConfig()
  }
}
