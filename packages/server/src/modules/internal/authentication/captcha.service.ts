import { Inject, Provide } from '@midwayjs/core'
import type { CaptchaService as Captcha } from '@midwayjs/captcha'

@Provide()
export class CaptchaService {
  @Inject()
  captchaService: Captcha

  async getCaptcha() {
    const { id, imageBase64: data } = await this.captchaService.image({
      size: 4,
      noise: 3,
      type: 'letter',
    })
    return {
      id,
      data,
    }
  }

  async verifyCaptcha(captchaId: string, captcha: string) {
    return await this.captchaService.check(captchaId, captcha)
  }
}
