import kRequest from '../index'
import type { OpenCaptchaResponse } from '@/typings/httpTypes/open/captcha'
import config from '@/config'
import type { SystemInfoResponse } from '@/typings/httpTypes/system/info'

const context = config.REQUEST_PREFIX + '/open'
const context2 = config.REQUEST_PREFIX + '/system'

const api = {
  captcha: `${context}/captcha`,
  serverInfo: `${context2}/info`
}

//获取验证码
export function getCaptchaAPI(): Promise<OpenCaptchaResponse> {
  return kRequest.get({
    url: api.captcha
  })
}

//获取服务器信息
export function getSystemInfo(): Promise<SystemInfoResponse> {
  return kRequest.get({
    url: api.serverInfo
  })
}
