import type { Router } from 'vue-router'
import { userStore } from '@/stores'
import { useLoadingBar } from '@/hook/naviaDiscreteApi'

export const guard = function (router: Router) {
  router.beforeEach(async (to, form) => {
    useLoadingBar.start()
    const tokenStatus = userStore().tokenStatus
    if (to.path !== '/login' && !tokenStatus) {
			return { path: '/login', replace: true }
    }
    return true
  })
  router.afterEach((form) => {
    document.title = form.meta.title || ''
    useLoadingBar.finish()
  })
}
