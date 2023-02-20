import type { Router } from 'vue-router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { useAuth } from '@/hooks/useAuth'
import { useUserStore } from '@/stores'
export const guard = function (router: Router) {
  NProgress.configure({
    easing: 'ease',
    speed: 500,
    showSpinner: true,
    trickleSpeed: 200,
    minimum: 0.3
  })
  router.beforeEach(async (to) => {
    NProgress.start()
    const isValid = useAuth.status('token')
    const refreshTokenStatus = useAuth.status('refreshToken')
    const token = useAuth.get('token')
    if (to.path !== '/login' && !isValid) {
      if (token && refreshTokenStatus) {
        try {
          await useUserStore().refreshToken()
          return true
        } catch (e) {
          return '/login'
        }
      } else {
        return '/login'
      }
    }
    return true
  })
  router.afterEach((form) => {
    document.title = form.meta.title || ''
    NProgress.done()
  })
}
