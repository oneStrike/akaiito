import {
  ValidateString,
} from '@/common/decorators/validate.decorator'

export class UserRegisterDto {
  @ValidateString({
    description: '用户名',
    example: 'admin001',
    required: true,
    maxLength: 20,
    minLength: 6,
  })
  username!: string

  @ValidateString({
    description: '密码',
    example: 'Aa@123456',
    required: true,
    password: true,
  })
  password!: string

  @ValidateString({
    description: '确认密码',
    example: 'Aa@123456',
    required: true,
    password: true,
  })
  confirmPassword!: string

  @ValidateString({
    description: '手机号',
    example: '13800138000',
    required: false,
  })
  mobile?: string
}
