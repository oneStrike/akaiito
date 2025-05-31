import { ValidateString } from '@/common/decorators/validate.decorator'

export class UpdateUserDto {
  @ValidateString({
    description: '用户名',
    example: 'admin001',
    required: false,
    maxLength: 20,
    minLength: 6,
  })
  username?: string

  @ValidateString({
    description: '头像',
    example: 'https://example.com/avatar.png',
    required: false,
  })
  avatar?: string

  @ValidateString({
    description: '手机号',
    example: '13800138000',
    required: false,
  })
  mobile?: string
}
