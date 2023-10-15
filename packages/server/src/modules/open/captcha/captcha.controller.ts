import { Controller, Get, Inject } from '@midwayjs/core'
import { CaptchaService } from '@midwayjs/captcha'

@Controller('/open/captcha')
export class CaptchaController {
  @Inject()
  captchaServer: CaptchaService

  @Get('/getCaptcha')
  async getCaptcha() {
    return await this.captchaServer.formula()
  }
}
