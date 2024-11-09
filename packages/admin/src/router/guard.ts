import type { Router } from 'vue-router'
import { config } from '@/config'
import { useUserStore } from '@/stores/modules/user'
// @ts-expect-error ignore
import nProgress from 'nprogress'

export const guard = function (router: Router) {
  // 在路由跳转前执行的函数
  router.beforeEach(async (to) => {
    // 开始进度条
    nProgress.start()

    // 如果目标路由在白名单中，直接通过
    if (config.auth.routerWhiteList.includes(to.name as string)) {
      return true
    }

    await useUserStore().renewToken()
    return true
  })

  // 在路由跳转后执行的函数
  router.afterEach((form) => {
    // 设置页面标题
    document.title = form.meta.title ?? ''

    // 完成进度条
    nProgress.done()
  })
}
