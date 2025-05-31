import { ValidateString } from '@/common/decorators/validate.decorator'

export class UpdatePasswordDto {
  @ValidateString({
    description: '旧密码',
    example: 'Aa@123456',
    required: true,
    password: true,
  })
  oldPassword!: string

  @ValidateString({
    description: '新密码',
    example: 'Bb@123456',
    required: true,
    password: true,
  })
  newPassword!: string

  @ValidateString({
    description: '确认新密码',
    example: 'Bb@123456',
    required: true,
    password: true,
  })
  confirmPassword!: string
}
