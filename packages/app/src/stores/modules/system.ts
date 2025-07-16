import type {
  GetPageConfigTypesRes,
  GetSystemConfigTypesRes,
} from '@/apis/types/appManage'

export interface UseSystemStoreState {
  systemStatus: 'normal' | 'disable' | 'crash'
  systemConfig: GetSystemConfigTypesRes | null
  pageConfig: GetPageConfigTypesRes
}

export const useSystemStore = defineStore('useSystemStore', {
  state() {
    return {
      systemStatus: 'normal',
      systemConfig: null,
      pageConfig: [],
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

  actions: {},
})
