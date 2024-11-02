import type { LoginTypesReq } from '@/apis/types/v3'
import { loginApi } from '@/apis/v3'
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

  actions: {
    async login(params: Omit<LoginTypesReq, 'salt'>) {
      const data = await loginApi({
        username: params.username,
        password: btoa(`${params.password}-1086`),
        salt: '1086',
      })
      this.userInfo = data
      this.token = data.token
      useRouter.reLaunch({ name: 'home' })
    },
  },
})
