import dayjs from 'dayjs'
import config from '@/config'
import { Plugin } from 'vue'
import { queryApi, querySystemInfo } from '@/core/query'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs

    for (const iterator in config) {
      app.config.globalProperties['$' + iterator] =
        config[iterator as keyof typeof config]
    }

    queryApi.getPages()
    queryApi.systemInfo()
    //查询是否为首次进入，判断是否展示引导页
    console.log('🚀 ~ file:bootstrap method:install line:16 -----')
  }
}
