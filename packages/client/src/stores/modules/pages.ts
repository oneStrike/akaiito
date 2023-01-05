import { ClientGetPagesRes } from '~@/apiTypes/manage'

const pagesStore = defineStore('pages', {
  state() {
    return {
      pages: [] as ClientGetPagesRes
    }
  }
})

export default pagesStore
