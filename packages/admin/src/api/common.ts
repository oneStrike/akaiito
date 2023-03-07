import kRequest from './index'
import type { AdminSystemInfoRes } from '~@/apiTypes/system'
import type { OpenGetCaptchaRes } from '@akaiito/typings/src/open/apiTypes/captcha'
import config from '@/config'
import type {
  CommonUploadReq,
  CommonUploadRes
} from '@akaiito/typings/src/common/apiTypes/upload'
const context = '/system'

const api = {
  captcha: `/captcha/getCaptcha`,
  systemInfo: `${context}/systemInfo`,
  uploadFile: config.UPLOAD_URL.replace('foo/common', '')
}






//获取验证码
export function getCaptchaAPI(): Promise<OpenGetCaptchaRes> {
  return kRequest.get({
    url: api.captcha,
    urlPrefix: 'open'
  })
}

//获取服务器信息
export function getSystemInfo(): Promise<AdminSystemInfoRes> {
  return kRequest.get({
    url: api.systemInfo
  })
}

//上传
export function uploadFileApi(
  params: CommonUploadReq
): Promise<CommonUploadRes> {
  return kRequest.post({
    url: api.uploadFile,
    data: params,
    urlPrefix: 'common'
  })
}
