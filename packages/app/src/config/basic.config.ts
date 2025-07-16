import { useWx } from '@/hooks/useWx'

const platformConfig = {
  APPID: useWx.getWxAppId(),
  BASIC_URL: 'https://demo.mengdo.cn',
}

// #ifdef H5
platformConfig.APPID = 'wxa0585ae9921c904f'
platformConfig.BASIC_URL = '/api'
// #endif

export const basicConfig = {
  ...platformConfig,
  // TOKEN有效期
  TOKEN_EXPIRE_TIME: 1.8 * 60 * 60 * 1000,
  // refresh token 有效期
  REFRESH_TOKEN_EXPIRE_TIME: 24 * 60 * 60 * 1000,
}
