import { ClientLoginRes } from '~@/apiTypes/user'
const userStore = defineStore('user', {
  state() {
    return {
      userInfo: {
        vipStatus: 1,
        vipLevel: 99
      } as ClientLoginRes
    }
  }
})

export default userStore
