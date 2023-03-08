import { ClientGetPagesRes } from '~@/apiTypes/manage'
import { getPagesApi } from '@/api/manage/manage'

export const pageStore = defineStore('pages', {
  state() {
    return {
      pages: [] as ClientGetPagesRes
    }
  },
  actions: {
    async getPages() {
      this.pages = await getPagesApi()
    }
  }
})
