import { httpClient } from '@/utils/request'
import { GetCaptchaTypings } from './captcha.d'

export const getCaptchaApi = (): Promise<GetCaptchaTypings['Response']> => {
  return httpClient({
    method: 'get',
    url: '/open/captcha/getCaptcha'
  })
}
