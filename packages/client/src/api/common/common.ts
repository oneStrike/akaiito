import { ajax } from '@/api'
import type { ClientHomeLayoutRes } from '~@/apiTypes/layout'
import config from '@/config'
const api = {
  homeConfig: config.REQUEST_PREFIX + '/layout/homeLayout'
}

//获取首页配置信息
export function getHomeLayout(): Promise<ClientHomeLayoutRes> {
  return ajax.get({
    url: api.homeConfig
  })
}
