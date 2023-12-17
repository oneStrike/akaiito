import type { Router } from 'vue-router'
import nProgress from 'nprogress'
import { userStore } from '@/stores/modules/user'
import { config } from '@/config'

export const guard = function (router: Router) {
  // 在路由跳转前执行的函数
  router.beforeEach(async (to) => {
    // 开始进度条
    nProgress.start()

    // 如果目标路由在白名单中，直接通过
    if (config.auth.routerWhiteList.includes(to.name as string)) {
      return true
    }

    const useUserStore = userStore()
    // 获取用户 token 的状态
    let authStatus = useUserStore.getAuth('access')
    if (!authStatus) {
      await useUserStore.refreshAccessToken()
      authStatus = useUserStore.getAuth('access')
      // 如果目标路由不是登录页且用户未登录，跳转到登录页
      if (!authStatus) {
        return { path: '/login', replace: true }
      }
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
