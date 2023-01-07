import { ajax } from '@/api'
import config from '@/config'
import { ClientGetPagesRes } from '~@/apiTypes/manage'
const api = {
  pages: config.REQUEST_PREFIX + '/manage/getPages'
}

export const getPagesApi = (): Promise<ClientGetPagesRes> => {
  return ajax.get({
    url: api.pages
  })
}
