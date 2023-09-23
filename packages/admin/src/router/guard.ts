import type { Router } from 'vue-router'
import { userStore } from '@/stores'
import { useLoadingBar } from '@/hooks/naviaDiscreteApi'
import { utils } from '@/utils'
import { RouterWhiteListEnum } from '@/enum/whiteList'

export const guard = function (router: Router) {
  router.beforeEach(async (to) => {
    useLoadingBar.start()
    if (utils.isValueInStringEnum(to.name as string, RouterWhiteListEnum))
      return true
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
