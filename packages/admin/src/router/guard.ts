import type { Router } from 'vue-router'
import nProgress from 'nprogress'
import { StorageEnum } from '@/enum/storage'

const historyRoute = useSessionStorage(StorageEnum.HISTORY_ROUTER, [
  {
    title: '工作台',
    name: 'Dashboard',
    icon: 'dashboard',
  },
])
export const guard = function (router: Router) {
  // 在路由跳转前执行的函数
  router.beforeEach(async (to) => {
    // 开始进度条
    nProgress.start()
    return true
  })

  // 在路由跳转后执行的函数
  router.afterEach((form) => {
    // 设置页面标题
    document.title = form.meta.title ?? ''
    if (!historyRoute.value.find((item) => item.name === form.name) && form.name !== 'Login') {
      historyRoute.value.push({
        title: form.meta.title!,
        icon: form.meta.icon!,
        name: form.name! as string,
      })
    }
    // 完成进度条
    nProgress.done()
  })
}
