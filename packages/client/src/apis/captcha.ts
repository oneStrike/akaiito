import { httpClient } from '@/utils/request'
import type { GetCaptchaTypings } from './captcha.d'

export function getCaptchaApi(): Promise<GetCaptchaTypings['Response']> {
  return httpClient({
    method: 'GET',
    url: '/open/captcha/getCaptcha',
  })
}
