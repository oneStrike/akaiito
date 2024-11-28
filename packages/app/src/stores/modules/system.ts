import type { GetSystemConfigTypesRes } from '@/apis/types/appManage'
import { getSystemConfigApi } from '@/apis/appManage'

export interface UseSystemStoreState {
  systemStatus: 'normal' | 'disable' | 'crash'
  systemConfig: GetSystemConfigTypesRes | null
  pageConfig: IterateObject
}

export const useSystemStore = defineStore('useSystemStore', {
  state() {
    return {
      systemStatus: 'normal',
      systemConfig: null,
      pageConfig: {},
    } as UseSystemStoreState
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
    async getSystemConfig() {
      this.systemConfig = await getSystemConfigApi()
    },
  },
})
