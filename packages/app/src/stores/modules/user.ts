import type { UserInfoTypesRes } from '@/apis/types/user'

export interface UseUserStoreState {
  userInfo: UserInfoTypesRes | null
  token: {}
}

export const useUserStore = defineStore('useUserStore', {
  state() {
    return {
      userInfo: {},
      token: {},
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

  actions: {},
})
