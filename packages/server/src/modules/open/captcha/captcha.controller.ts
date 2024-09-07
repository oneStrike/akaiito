import { Controller, Get, Inject } from '@midwayjs/core'
import type { CaptchaService } from '../../internal/authentication/captcha.service'

@Controller('/open/captcha')
export class CaptchaController {
  @Inject()
  captchaServer: CaptchaService

  @Get('/getCaptcha', { summary: '获取验证码' })
  async getCaptcha() {
    return await this.captchaServer.getCaptcha()
  }
}
