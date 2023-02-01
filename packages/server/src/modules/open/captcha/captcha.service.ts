import { Provide, Inject } from '@midwayjs/core'
import { CaptchaService } from '@midwayjs/captcha'
@Provide()
export class CaptchaServiceOpen {
  @Inject()
  captchaService: CaptchaService

  /**
   * 生成验证码，计算表达式
   * @returns
   */
  async generateCaptcha() {
    return await this.captchaService.formula({ noise: 3 })
  }

  /**
   * 校验验证码
   */
  async captchaCheck(captchaId: string, value: string) {
    return await this.captchaService.check(captchaId, value)
  }
}
