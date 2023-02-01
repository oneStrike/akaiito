import { ajax } from '@/api'
import config from '@/config'
import { ClientGetPagesRes, ClientSystemInfoRes } from '~@/apiTypes/manage'
const api = {
  pages: config.REQUEST_PREFIX + '/manage/getPages',
  systemConfig: config.REQUEST_PREFIX + '/manage/getSystemConfig'
}

export const getPagesApi = (): Promise<ClientGetPagesRes> => {
  return ajax.get({
    url: api.pages
  })
}

export const systemConfigApi = (): Promise<ClientSystemInfoRes> => {
  return ajax.get({
    url: api.systemConfig
  })
}
