import kRequest from '@/api/index'
import config from '@/config'
import type { AdminGetClientPageRes } from '~@/../../../typings/src/admin/apiTypes/clientManage'
const context = config.REQUEST_PREFIX + '/clientManage'

const api = {
  getClientPage: `${context}/getClientPage`
}

export function clientPageApi(): Promise<AdminGetClientPageRes> {
  return kRequest.get({
    url: api.getClientPage
  })
}
