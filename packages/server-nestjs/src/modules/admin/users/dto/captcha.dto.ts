import { ValidateString } from '@/common/decorators/validate.decorator'

export class CaptchaDto {
  @ValidateString({
    description: '验证码ID',
    example: '17e2d660-1cb6-4012-8fe9-5cf865db933d',
    required: true,
  })
  id!: string

  @ValidateString({
    description: '验证码',
    example: '',
    required: true,
  })
  captcha!: string
}
