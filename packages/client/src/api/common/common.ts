import { ajax } from '@/api'
import { LayoutLayoutResponse } from '@/typings/httpTypes/layout/layout'
const api = {
  homeConfig: '/app/layout/layout'
}

//获取首页配置信息
export function getHomeLayout(): Promise<LayoutLayoutResponse> {
  return ajax.get({
    url: api.homeConfig
  })
}
