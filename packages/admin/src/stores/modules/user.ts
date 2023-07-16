import { getUserInfoApi, loginApi, refreshTokenApi } from '@/api/user'
import type { UserStore } from '@/typings/stores/user'
import type { AdminLoginReq } from '~@/apiTypes/user'
import dayjs from 'dayjs'
import { useIntervalFn } from '@vueuse/core'
import { router } from '@/router'

export const userStore = defineStore('userStore', {
  persist: {
    storage: sessionStorage
  },
  state() {
    return {
      userInfo: {},
      token: '',
      role: 'admin',
      refreshToken: '',
      tokenExpiredAt: 0,
      pauseRenewalToken: null
    } as UserStore
  },

  getters: {
    tokenStatus(): boolean {
      const timestamp = dayjs().unix()
      return !!(
        this.token && timestamp - this.tokenExpiredAt < 60 * 60 * 2 * 1000
      )
    }
  },

  actions: {
    async login(param: AdminLoginReq) {
      const { token, refreshToken, user } = await loginApi(param)
      this.userInfo = user
      this.token = token
      this.refreshToken = refreshToken
      this.tokenExpiredAt = dayjs().unix()
    },
    /**
     * 刷新token
     */
    async refreshTokenFn() {
      this.token = await refreshTokenApi()
      this.tokenExpiredAt = dayjs().unix()
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
      router.replace('/login')
      this.$reset()
      this.pauseRenewalToken && this.pauseRenewalToken()
    },

    //自动续期token
    renewalToken() {
      this.pauseRenewalToken = useIntervalFn(
        () => {
          this.refreshTokenFn()
        },
        60 * 60 * 1.8 * 1000
      ).pause
    }
  }
})
