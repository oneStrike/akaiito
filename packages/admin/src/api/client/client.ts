import kRequest from '@/api'
import config from '@/config'
import type { AdminGetClientPageRes } from '~@/apiTypes/clientManage'
const context = config.REQUEST_PREFIX + '/clientManage'

const api = {
  getClientPage: `${context}/getClientPage`
}

export function clientPageApi(): Promise<AdminGetClientPageRes> {
  return kRequest.get({
    url: api.getClientPage
  })
}
