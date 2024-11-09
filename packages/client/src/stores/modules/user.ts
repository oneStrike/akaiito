import type { UserLoginTypesReq, UserUserInfoTypesRes } from '@/apis/types/user'
import { userLoginApi, userRefreshTokenApi, userUserInfoApi } from '@/apis/user'
import { basicConfig } from '@/config/basic.config'
import { useRouter } from '@/hooks/useRouter'
import { utils } from '@/utils'

export interface UseUserStoreState {
  userInfo: UserUserInfoTypesRes | null
  token: {
    accessToken: string
    refreshToken: string
    accessExpiresIn: number
    refreshExpiresIn: number
  }
}

export const useUserStore = defineStore('useUserStore', {
  state() {
    return {
      userInfo: {},
      token: {
        accessToken: '',
        refreshToken: '',
        accessExpiresIn: 0,
        refreshExpiresIn: 0,
      },
    } as UseUserStoreState
  },
  persist: {
    storage: {
      getItem(key) {
        return uni.getStorageSync(key)
      },
      setItem(key, val) {
        return uni.setStorageSync(key, val)
      },
    },
  },

  actions: {
    async login(params: UserLoginTypesReq) {
      const data = await userLoginApi(params)
      const { TOKEN_EXPIRE_TIME, REFRESH_TOKEN_EXPIRE_TIME } = basicConfig
      const timestamp = utils.dayjs().unix()
      this.token = {
        accessToken: data.token.accessToken,
        refreshToken: data.token.refreshToken,
        accessExpiresIn: TOKEN_EXPIRE_TIME + timestamp,
        refreshExpiresIn: REFRESH_TOKEN_EXPIRE_TIME + timestamp,
      }
      this.getUserInfo()
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
      if (!this.getAuthStatus()) {
        try {
          this.token.accessToken = await userRefreshTokenApi({
            accessToken: this.token.accessToken,
            refreshToken: this.token.refreshToken,
          })
          const { TOKEN_EXPIRE_TIME } = basicConfig
          const timestamp = utils.dayjs().unix()
          this.token.accessExpiresIn = TOKEN_EXPIRE_TIME + timestamp
        } catch (e) {
          this.signOut()
          throw new Error('token失效')
        }
      }
    },

    signOut() {
      this.token = {
        accessToken: '',
        refreshToken: '',
        accessExpiresIn: 0,
        refreshExpiresIn: 0,
      }
      this.userInfo = null
      useRouter.reLaunch({ name: 'login' })
    },

    async getUserInfo() {
      if (!this.token) {
        useRouter.reLaunch({ name: 'login' })
        return
      }
      this.userInfo = await userUserInfoApi()
    },
  },
})
