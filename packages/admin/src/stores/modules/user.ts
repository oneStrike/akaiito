export const userStore = defineStore('userStore', {
  persist: {
    storage: sessionStorage
  },
  state: () => ({}),

  getters: {
    tokenStatus() {
      return false
    }
  }
})
