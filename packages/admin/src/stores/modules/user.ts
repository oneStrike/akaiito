import type { LoginTypesRes } from '@/apis/types/user'
import { refreshAccessTokenApi } from '@/apis/user'
import { config } from '@/config'
import router from '@/router'
import dayjs from 'dayjs'

export interface UserState {
  token: {
    accessToken: string
    refreshToken: string
    accessTokenExpiresIn?: number
    refreshTokenExpiresIn?: number
  }
  userInfo: LoginTypesRes['userInfo'] | null
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
    },
  }),

  getters: {
    tokenStatus() {
      return false
    },
  },

  actions: {
    signOut() {
      this.token = {
        accessToken: '',
        refreshToken: '',
      }
      this.setUserInfo(null)
      router.replace({ name: 'Login' })
    },
    // 设置用户信息
    setUserInfo(userInfo: LoginTypesRes['userInfo'] | null) {
      this.userInfo = userInfo
    },
    // 设置认证信息
    setAuth(authInfo: LoginTypesRes) {
      const { token, userInfo } = authInfo
      const { accessToken, refreshToken } = config.auth
      const timestamp = dayjs().unix()
      this.setUserInfo(userInfo)
      this.token = {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpiresIn: accessToken.expiresIn + timestamp,
        refreshTokenExpiresIn: refreshToken.expiresIn + timestamp,
      }
    },

    // 获取认证信息
    getAuth(type: 'access' | 'refresh') {
      const timestamp = dayjs().unix()
      const target = (type === 'access' ? this.token.accessTokenExpiresIn : this.token.refreshTokenExpiresIn) || 0
      return target > timestamp + 1000 * 60 * 10
    },

    // 刷新访问令牌
    async refreshAccessToken() {
      try {
        if (!this.token.accessToken) return
        // 刷新访问令牌
        this.token.accessToken = await refreshAccessTokenApi({
          accessToken: this.token.accessToken,
        })
        // 更新访问令牌过期时间
        this.token.accessTokenExpiresIn = dayjs().unix() + config.auth.accessToken.expiresIn
      } catch (e) {
        // 若刷新失败，则将认证信息重置为空
        this.token = {
          accessToken: '',
          refreshToken: '',
        }
      }
    },
  },
})
