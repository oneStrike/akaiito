import type { V3loginTypesReq } from '@/apis/types/v3'
import { memberinfoApi } from '@/apis/member'
import { v3loginApi } from '@/apis/v3'
import { useRouter } from '@/hooks/useRouter'

export interface UseUserStoreState {
  userInfo: IterateObject
  token: string
}

export const useUserStore = defineStore('useUserStore', {
  state() {
    return {
      userInfo: {},
      token: '',
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
    async login(params: Omit<V3loginTypesReq, 'salt'>) {
      const data = await v3loginApi({
        username: params.username,
        password: btoa(`${params.password}-1086`),
        salt: '1086',
      })
      this.token = data.token
      this.getUserInfo()
    },

    async getUserInfo() {
      if (!this.token) {
        useRouter.reLaunch({ name: 'login' })
        return
      }
      this.userInfo = await memberinfoApi()
    },
  },
})
