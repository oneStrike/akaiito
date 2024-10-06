import { useSystemConfigStore } from '@/stores/modules/systemConfig'
import { filePath } from '@/utils/filePath'
import dayjs from 'dayjs'
import type { Plugin } from 'vue'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$filePath = filePath

    useSystemConfigStore().getSystemConfig()
  },
}
