import { Controller, Get, Inject } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { CaptchaServiceOpen } from './captcha.service'
import { Validate } from '@midwayjs/validate'

@Controller('/open/captcha')
export class CaptchaController extends BaseController {
  @Inject()
  captchaService: CaptchaServiceOpen

  @Get('/getCaptcha')
  @Validate()
  async captcha() {
    const { id, imageBase64 } = await this.captchaService.generateCaptcha()
    this.ctx.session.captchaId = id
    return {
      data: imageBase64,
      id
    }
  }
}
