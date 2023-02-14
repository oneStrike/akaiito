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
    if (to.meta.url) {
      window.open(to.meta.url)
      return false
    }
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
          return { path: '/login', replace: true }
        }
      } else {
        return { path: '/login', replace: true }
      }
    }

    return true
  })
  router.afterEach((to) => {
    document.title = to.meta.title || ''
    NProgress.done()
  })
}
