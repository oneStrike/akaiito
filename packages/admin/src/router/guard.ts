import type { Router } from 'vue-router'
import nProgress from 'nprogress'

export const guard = function (router: Router) {
  // 在路由跳转前执行的函数
  router.beforeEach(async (to) => {
    // 开始进度条
    nProgress.start()
    console.log(123)
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
