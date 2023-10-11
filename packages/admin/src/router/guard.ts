import type { Router } from 'vue-router'
import nProgress from 'nprogress'
import { utils } from '@/utils'
import { RouterWhiteListEnum } from '@/enum/routerWhiteList'
import { userStore } from '@/stores/modules/user'

export const guard = function (router: Router) {
  // 在路由跳转前执行的函数
  router.beforeEach(async (to) => {
    // 开始进度条
    nProgress.start()

    // 如果目标路由在白名单中，直接通过
    if (utils.isValueInStringEnum(to.name, RouterWhiteListEnum)) {
      return true
    }

    // 获取用户 token 的状态
    const tokenStatus = userStore().tokenStatus

    // 如果目标路由不是登录页且用户未登录，跳转到登录页
    if (to.path !== '/login' && !tokenStatus) {
      return { path: '/login', replace: true }
    }

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
