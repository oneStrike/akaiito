import type { LoginTypesReq } from '@/apis/types/user'
import { getUserInfoApi, loginApi } from '@/apis/user'

const userStore = defineStore('user', {
  persist: {
    storage: sessionStorage,
  },
  state: () => {
    return {
      userInfo: {},
      auth: {},
    }
  },
  actions: {
    /**
     * 登录
     * @param param
     */
    async login(param: LoginTypesReq) {
      const { token, userInfo } = await loginApi(param)
      this.userInfo = userInfo
    },

    /**
     * 获取用户信息
     */
    async getUserInfo() {
      this.userInfo = await getUserInfoApi({})
    },
  },
})
export default userStore
