import type { LoginTypesReq, LoginTypesRes } from '@/apis/types/user'
import { loginApi, logoutApi, refreshTokenApi } from '@/apis/user.ts'
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
        accessExpiresIn: expiresIn.accessToken / 1000 + timestamp, // 转换为秒
        refreshExpiresIn: expiresIn.refreshToken / 1000 + timestamp, // 转换为秒
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
      const timestamp = utils.dayjs().unix()
      const accessTokenWillExpireIn5Min =
        this.token.accessExpiresIn - timestamp <= 300 // 5分钟 = 300秒
      const accessTokenExpired = this.token.accessExpiresIn <= timestamp
      const refreshTokenValid = this.getAuthStatus('refresh')

      // 在accessToken到期前5分钟或已过期，且refreshToken有效时才刷新
      if (
        (accessTokenWillExpireIn5Min || accessTokenExpired) &&
        refreshTokenValid &&
        this.token.accessToken
      ) {
        try {
          const { tokens } = await refreshTokenApi({
            refreshToken: this.token.refreshToken,
          })
          this.token.accessToken = tokens.accessToken
          this.token.refreshToken = tokens.refreshToken
          const { expiresIn } = config.auth
          const newTimestamp = utils.dayjs().unix()
          this.token.accessExpiresIn =
            expiresIn.accessToken / 1000 + newTimestamp // 转换为秒
          this.token.refreshExpiresIn =
            expiresIn.refreshToken / 1000 + newTimestamp // 转换为秒
        } catch (e) {
          this.signOut()
          throw new Error('token失效')
        }
      }
    },

    // 退出登录
    async signOut() {
      if (this.token.accessToken) {
        await logoutApi(this.token)
      }
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
