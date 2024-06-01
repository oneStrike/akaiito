import { httpClient } from '@/utils/request'
import type { GetCaptchaTypings } from './captcha.d'

export const getCaptchaApi = (): Promise<GetCaptchaTypings['Response']> => {
  return httpClient({
    method: 'get',
    url: '/open/captcha/getCaptcha'
  })
}
