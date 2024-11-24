import { getAppSystemConfigApi } from '@/apis/appManage'
import type { GetAppSystemConfigTypesRes } from '@/apis/types/appManage'

export interface UseSystemStoreState {
  systemStatus: 'normal' | 'disable' | 'crash'
  systemConfig: GetAppSystemConfigTypesRes | null
  menuList: IterateObject[]
  regionTree: IterateObject[]
  pageConfig: IterateObject
}

export const useSystemStore = defineStore('useSystemStore', {
  state() {
    return {
      systemStatus: 'normal',
      systemConfig: null,
      menuList: [],
      regionTree: [],
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
      this.systemConfig = await getAppSystemConfigApi()
    },
  },
})
