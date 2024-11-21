import type { LoginTypesReq, LoginTypesRes } from '@/apis/types/user'
import { loginApi, refreshAccessTokenApi } from '@/apis/user'
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
  userInfo: LoginTypesRes['userInfo'] | null
}

export const useUserStore = defineStore(
  'useUserStore',
  () => {
    const userInfo = ref<UserState['userInfo'] | null>(null)
    const token = ref<UserState['token']>({
      accessToken: '',
      refreshToken: '',
      accessExpiresIn: 0,
      refreshExpiresIn: 0,
    })

    // 登录
    const signIn = async (data: LoginTypesReq) => {
      const res = await loginApi(data)
      userInfo.value = res.userInfo

      const { expiresIn } = config.auth
      const timestamp = utils.dayjs().unix()
      token.value = {
        accessToken: res.token.accessToken,
        refreshToken: res.token.refreshToken,
        accessExpiresIn: expiresIn.accessToken + timestamp,
        refreshExpiresIn: expiresIn.refreshToken + timestamp,
      }
    }

    // 获取认证信息
    const getAuthStatus = (type: 'access' | 'refresh' = 'access') => {
      const timestamp = utils.dayjs().unix()
      if (type === 'access') {
        return token.value.accessExpiresIn > timestamp
      }
      return token.value.refreshExpiresIn > timestamp
    }
    // 退出登录
    const signOut = () => {
      token.value = {
        accessToken: '',
        refreshToken: '',
        accessExpiresIn: 0,
        refreshExpiresIn: 0,
      }
      userInfo.value = null
      router.replace({ name: 'Login' })
    }
    // 刷新token
    const renewToken = async () => {
      if (!getAuthStatus() && token.value.accessToken) {
        try {
          token.value.accessToken = await refreshAccessTokenApi({
            accessToken: token.value.accessToken,
            refreshToken: token.value.refreshToken,
          })
          const { expiresIn } = config.auth
          const timestamp = utils.dayjs().unix()
          token.value.accessExpiresIn = expiresIn.accessToken + timestamp
        } catch (e) {
          signOut()
          throw new Error('token失效')
        }
      }
    }
    return {
      userInfo,
      token,
      signIn,
      getAuthStatus,
      signOut,
      renewToken,
    }
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
)
