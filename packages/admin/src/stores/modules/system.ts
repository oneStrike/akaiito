import { publicKeyApi } from '@/apis/auth.ts'

export interface SystemState {
  rsaPublicKey: string
}

export const useSystemStore = defineStore('system', {
  persist: {
    storage: sessionStorage,
  },
  state: (): SystemState => ({
    rsaPublicKey: '',
  }),
  actions: {
    async getRsaPublicKey() {
      if (!this.rsaPublicKey) {
        const { publicKey } = await publicKeyApi()
        this.rsaPublicKey = publicKey
      }
      return this.rsaPublicKey
    },
  },
})
