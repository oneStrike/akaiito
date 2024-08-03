import { getClientSystemConfigApi } from '@/apis/clientManage'
import type { ResolvedReturnType } from '@akaiito/typings/src'

export interface UseSystemConfigState {
  systemConfig: ResolvedReturnType<typeof getClientSystemConfigApi>
}

export const useSystemConfigStore = defineStore('useSystemConfig', {
  state() {
    return {
      systemConfig: {}
    } as UseSystemConfigState
  },
  actions: {
    async getSystemConfig() {
      this.systemConfig = await getClientSystemConfigApi()
    }
  }
})
