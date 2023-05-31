import dayjs from 'dayjs'
import config from '@/config'
import type { Plugin } from 'vue'
import { useRouter } from '@/hooks/useRouter'
import { pageStore, systemStore } from '@/stores'

export const bootstrap: Plugin = {
  install: (app) => {
    app.config.globalProperties.$dayjs = dayjs

    for (const iterator in config) {
      app.config.globalProperties['$' + iterator] =
        config[iterator as keyof typeof config]
    }
  }
}

export const bootstrapThing = () => {
  const usePageStore = pageStore()
  const useSystemStore = systemStore()
  //获取程序的所有页面配置
  usePageStore.getPages()
	console.log(useSystemStore.firstEntering);
  //初始页面引导
  if (useSystemStore.firstEntering) {
    useRouter.reLaunch({
      path: '/guide/guide'
    })
  }
}
