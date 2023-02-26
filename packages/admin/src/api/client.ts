import kRequest from '@/api/index'
import type { AdminGetClientPageRes } from '~@/apiTypes/clientManage'
const context = '/clientManage'

const api = {
  getClientPage: `${context}/getClientPage`
}

export function clientPageApi(): Promise<AdminGetClientPageRes> {
  return kRequest.get({
    url: api.getClientPage
  })
}
