import dayjs from 'dayjs'
import config from '@/config'
import type { Plugin } from 'vue'
import { pageStore, systemStore, themeStore } from '@/stores'
import { StorageEnum } from '@/enum/storage'

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
  //主题色相关
  const useThemeStore = themeStore()
  const themeConfig = uni.getStorageSync(StorageEnum.THEME_CONFIG)
  if (themeConfig) {
    useThemeStore.changeTheme(themeConfig)
  }

  const usePageStore = pageStore()
  const useSystemStore = systemStore()
  //获取程序的所有页面配置
  usePageStore.getPages()
  //初始页面引导
  if (useSystemStore.firstEntering) {
    uni.$lk.router.reLaunch({
      path: 'guide/guide'
    })
  }
}
