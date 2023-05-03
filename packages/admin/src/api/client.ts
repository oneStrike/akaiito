import kRequest from '@/api/index'
import type {
  AdminGetClientPageRes,
  AdminUpdateClientConfigReq,
  AdminUpdateClientConfigRes
} from '~@/apiTypes/clientManage'
const context = '/clientManage'

const api = {
  getClientPage: `${context}/getClientPage`,
  updateClientConfig: `${context}/updateClientConfig`
}

export function clientPageApi(): Promise<AdminGetClientPageRes> {
  return kRequest.get({
    url: api.getClientPage
  })
}

export function updateClientConfigApi(
  params: AdminUpdateClientConfigReq
): Promise<AdminUpdateClientConfigRes> {
  return kRequest.post({
    url: api.updateClientConfig,
    data: params
  })
}
