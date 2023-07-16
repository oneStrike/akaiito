import { ClientGetPagesRes } from '~@/apiTypes/manage'
import { getPagesApi } from '@/api/manage/manage'

export const pageStore = defineStore('pages', {
  state: () => ({
    pages: [] as ClientGetPagesRes
  }),

  actions: {
    async getPages() {
      this.pages = await getPagesApi()
    }
  }
})
