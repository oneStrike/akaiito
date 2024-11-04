import type { Plugin } from 'vue'
import { filePath } from '@/utils/filePath'
import dayjs from 'dayjs'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$filePath = filePath
    useRouter.injectReLoad()
  },
}
