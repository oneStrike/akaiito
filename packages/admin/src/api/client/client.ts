import kRequest from '@/api'
import config from '@/config'
import type {
  ClientClientPageRequest,
  ClientClientPageResponse
} from '@/typings/httpTypes/client/clientPage'

const context = config.REQUEST_PREFIX + '/client'

const api = {
  clientPage: `${context}/getPage`
}

export function clientPageApi(): Promise<ClientClientPageResponse> {
  return kRequest.get({
    url: api.clientPage
  })
}
