export const userStore = defineStore('user', {
  persist: {
    storage: sessionStorage
  }
})
