import { useWx } from '@/hooks/useWx'

const platformConfig = {
  APPID: useWx.getWxAppId(),
  BASIC_URL: 'http://192.168.31.215:7001/',
}

// #ifdef H5
platformConfig.APPID = 'wxa0585ae9921c904f'
platformConfig.BASIC_URL = '/api'
// #endif

export const basicConfig = {
  ...platformConfig,
  // 文件上传地址
  UPLOAD_URL: `${platformConfig.BASIC_URL}/file/upload/saas`,
  // 视频上传地址
  VIDEO_UPLOAD_URL: `${platformConfig.BASIC_URL}/file/video/upload/`,
  // 文件路径前缀
  FILE_PATH_PREFIX: `${platformConfig.BASIC_URL}/file/dv-bucket/applet/${
    platformConfig.APPID
  }`,
  // TOKEN有效期
  TOKEN_EXPIRE_TIME: 1.8 * 60 * 60 * 1000,
  // refresh token 有效期
  REFRESH_TOKEN_EXPIRE_TIME: 24 * 60 * 60 * 1000,
}
