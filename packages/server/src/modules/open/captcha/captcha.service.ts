import { CaptchaService as Captcha } from '@midwayjs/captcha'
import { Inject, Provide } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'

@Provide()
export class CaptchaService {
  @Inject()
  captchaService: Captcha

  @Inject()
  ctx: Context

  async getCaptcha() {
    const { id, imageBase64: data } = await this.captchaService.image({
      size: 4,
      noise: 3,
      type: 'letter',
    })
    // this.ctx.rotateCsrfSecret()
    return { id, data }
  }

  async verifyCaptcha(captchaId: string, captcha: string) {
    return await this.captchaService.check(captchaId, captcha)
  }
}
