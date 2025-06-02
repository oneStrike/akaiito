import type { LoginTypesReq, LoginTypesRes } from '@/apis/types/user'
import { loginApi, refreshTokenApi } from '@/apis/user.ts'
import { config } from '@/config'
import router from '@/router'
import { utils } from '@/utils'

export interface UserState {
  token: {
    accessToken: string
    refreshToken: string
    accessExpiresIn: number
    refreshExpiresIn: number
  }
  userInfo: LoginTypesRes['user'] | null
}

export const useUserStore = defineStore('useUserStore', {
  persist: {
    storage: sessionStorage,
  },
  state: (): UserState => ({
    userInfo: null,
    token: {
      accessToken: '',
      refreshToken: '',
      accessExpiresIn: 0,
      refreshExpiresIn: 0,
    },
  }),

  actions: {
    // 登录
    async signIn(data: LoginTypesReq) {
      const res = await loginApi(data)
      this.userInfo = res.user

      const { expiresIn } = config.auth
      const timestamp = utils.dayjs().unix()
      this.token = {
        accessToken: res.tokens.accessToken,
        refreshToken: res.tokens.refreshToken,
        accessExpiresIn: expiresIn.accessToken + timestamp,
        refreshExpiresIn: expiresIn.refreshToken + timestamp,
      }
    },

    // 获取认证信息
    getAuthStatus(type: 'access' | 'refresh' = 'access') {
      const timestamp = utils.dayjs().unix()
      if (type === 'access') {
        return this.token.accessExpiresIn > timestamp
      }
      return this.token.refreshExpiresIn > timestamp
    },

    // 刷新token
    async renewToken() {
      if (!this.getAuthStatus() && this.token.accessToken) {
        try {
          this.token.accessToken = await refreshTokenApi({
            accessToken: this.token.accessToken,
            refreshToken: this.token.refreshToken,
          })
          const { expiresIn } = config.auth
          const timestamp = utils.dayjs().unix()
          this.token.accessExpiresIn = expiresIn.accessToken + timestamp
        } catch (e) {
          this.signOut()
          throw new Error('token失效')
        }
      }
    },

    // 退出登录
    signOut() {
      this.token = {
        accessToken: '',
        refreshToken: '',
        accessExpiresIn: 0,
        refreshExpiresIn: 0,
      }
      this.userInfo = null
      router.replace({ name: 'Login' })
    },
  },
})
