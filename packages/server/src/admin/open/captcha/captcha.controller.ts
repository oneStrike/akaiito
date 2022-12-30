import { Controller, Get, Inject } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { CaptchaServiceOpen } from './captcha.service'
import { Validate } from '@midwayjs/validate'

@Controller('/admin/open')
export class CaptchaController extends BaseController {
  @Inject()
  captchaService: CaptchaServiceOpen

  @Get('/captcha')
  @Validate()
  async captcha() {
    const { id, imageBase64 } = await this.captchaService.generateCaptcha()
    this.ctx.session.captchaId = id
    return imageBase64
  }
}
