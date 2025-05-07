import { CaptchaService } from '@/service/system/captcha/captcha.service'
import { Controller, Get, Inject } from '@midwayjs/core'

@Controller('/open/captcha')
export class CaptchaController {
  @Inject()
  captchaServer: CaptchaService

  @Get('/getCaptcha', { summary: '获取验证码' })
  async getCaptcha() {
    return await this.captchaServer.getCaptcha()
  }
}
