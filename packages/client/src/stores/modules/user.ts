import { ClientLoginRes } from '~@/apiTypes/user'
const userStore = defineStore('user', {
  state() {
    return {
      userInfo: {} as ClientLoginRes
    }
  }
})

export default userStore
