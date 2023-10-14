import { httpClient } from '@/api'

const context = '/open'

const api = {
  getCaptcha: `${context}/captcha/getCaptcha` //获取验证码
}

export const getCaptcha = (): Promise<{ id: string; data: string }> => {
  return httpClient.get({
    url: api.getCaptcha
  })
}
