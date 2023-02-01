import type { AdminLoginReq } from '~@/apiTypes/user'
import { getUserInfoApi, loginApi, refreshTokenApi } from '@/api/user/user'
import type { TokenInfo, UserInfo } from '@//typings/user/user'
import { useAuth } from '@/hooks/useAuth'
import router from '@/router'

const userStore = defineStore('user', {
  persist: {
    storage: sessionStorage
  },
  state: () => {
    return {
      userInfo: {} as UserInfo,
      auth: {} as TokenInfo
    }
  },
  actions: {
    /**
     * 登录
     * @param param
     */
    async login(param: AdminLoginReq) {
      const { token, refreshToken, user } = await loginApi(param)
      this.userInfo = user
      useAuth.set('token', token)
      useAuth.set('refreshToken', refreshToken)
    },
    /**
     * 刷新token
     */

    async refreshToken() {
      const token = await refreshTokenApi()
      useAuth.set('token', token)
    },

    /**
     * 获取用户信息
     */
    async getUserInfo() {
      this.userInfo = await getUserInfoApi()
    },

    /**
     * 退出登录
     */
    logout() {
      useAuth.clear()
      router.replace('/login')
    }
  }
})
export default userStore
