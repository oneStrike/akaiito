import { ValidateString } from '@/common/decorators/validate.decorator'

export class CaptchaDto {
  @ValidateString({
    description: '验证码 key',
    example: '1234',
    required: true,
  })
  id: string

  @ValidateString({
    description: '验证码',
    example:
      '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"150\" height=\"50\"></svg></svg>',
    required: true,
  })
  data: string
}
