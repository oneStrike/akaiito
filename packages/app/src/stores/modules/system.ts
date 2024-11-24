import { getClientSystemConfigApi } from '@/apis/clientManage'
import type { GetClientSystemConfigTypesRes } from '@/apis/types/clientManage'

export interface UseSystemStoreState {
  systemStatus: 'normal' | 'disable' | 'crash'
  systemConfig: GetClientSystemConfigTypesRes | null
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
      this.systemConfig = await getClientSystemConfigApi()
    },
  },
})
