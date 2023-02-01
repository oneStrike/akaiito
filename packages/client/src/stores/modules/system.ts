import { useStorage } from '@/hooks/useStorage'
import { StorageEnum } from '@/enum/storage'
import type { AdminSystemConfigRes } from '@akaiito/typings/src/admin/apiTypes/clientManage'
import { systemConfigApi } from '@/api/manage/manage'
const systemStore = defineStore('system', {
  state() {
    return {
      systemConfigInfo: {} as AdminSystemConfigRes
    }
  },
  getters: {
    //是否是安装后第一次进入，无法判断是否为新用户
    firstEntering(): boolean {
      const isFirst = useStorage.get(StorageEnum.FIRST_ENTERING)
      return !!isFirst
    }
  },
  actions: {
    async getSystemConfigInfo() {
      this.systemConfigInfo = await systemConfigApi()
    }
  }
})

export default systemStore
