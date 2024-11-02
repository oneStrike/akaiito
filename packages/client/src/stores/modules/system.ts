import type { IterateObject } from '@/types/global'

export interface UseSystemStoreState {
  systemStatus: 'normal' | 'disable' | 'crash'
  systemInfo: IterateObject
  menuList: IterateObject[]
  regionTree: IterateObject[]
  pageConfig: IterateObject
}

export const useSystemStore = defineStore('useSystemStore', {
  state() {
    return {
      systemStatus: 'normal',
      systemInfo: {},
      menuList: [],
      regionTree: [],
      pageConfig: {},
    } as UseSystemStoreState
  },

  actions: {},
})
