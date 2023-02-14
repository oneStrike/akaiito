import kRequest from './index'
import config from '@/config'
import type { AdminSystemInfoRes } from '~@/apiTypes/system'
import type { OpenGetCaptchaRes } from '@akaiito/typings/src/open/apiTypes/captcha'
const context = '/open'
const context2 = config.REQUEST_PREFIX + '/system'

const api = {
  captcha: `${context}/captcha/getCaptcha`,
  systemInfo: `${context2}/systemInfo`
}

//获取验证码
export function getCaptchaAPI(): Promise<OpenGetCaptchaRes> {
  return kRequest.get({
    url: api.captcha
  })
}

//获取服务器信息
export function getSystemInfo(): Promise<AdminSystemInfoRes> {
  return kRequest.get({
    url: api.systemInfo
  })
}
