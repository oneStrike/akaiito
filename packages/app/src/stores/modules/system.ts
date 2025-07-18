import { indexLogoApi } from '@/apis'

export interface UseSystemStoreState {
  appConfig: {
    logo: string
  }
}

export const useSystemStore = defineStore('useSystemStore', {
  state() {
    return {
      appConfig: {
        logo: '',
      },
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
    async getAppConfig() {
      const [logoRes] = await Promise.all([indexLogoApi()])
      this.appConfig.logo = logoRes.src
    },
  },
})
