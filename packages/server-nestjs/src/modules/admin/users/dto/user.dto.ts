import { ApiProperty, OmitType } from '@nestjs/swagger'
import {
  ValidateBoolean,
  ValidateByRegex,
  ValidateNumber,
  ValidateString,
} from '@/common/decorators/validate.decorator'
import { utils } from '@/utils'
import { TokenDto } from './token.dto'

export class UserDto {
  @ValidateNumber({
    description: '用户ID',
    example: 1,
    required: true,
    min: 1,
  })
  id!: number

  @ValidateString({
    description: '用户名',
    example: 'admin001',
    required: false,
    maxLength: 20,
    minLength: 6,
  })
  username!: string

  @ValidateString({
    description: '头像',
    example: 'https://example.com/avatar.png',
    required: false,
  })
  avatar?: string

  @ValidateByRegex({
    regex: utils.regexp.validPhone,
    description: '手机号',
    example: '13800138000',
    required: false,
  })
  mobile?: string

  @ValidateBoolean({
    description: '用户状态',
    example: true,
    default: true,
  })
  status: boolean

  @ValidateBoolean({
    description: '用户状态',
    example: false,
    default: false,
  })
  isRoot: boolean

  @ApiProperty({
    description: '创建时间',
    example: '2021-01-01 00:00:00',
  })
  createdAt: Date

  @ApiProperty({
    description: '更新时间',
    example: '2021-01-01 00:00:00',
  })
  updatedAt: Date
}

export class UserLoginDto {
  @ValidateString({
    description: '用户名',
    example: 'admin',
    required: true,
    maxLength: 18,
    minLength: 5,
  })
  username!: string

  @ValidateString({
    description: '密码',
    example: 'Aa@123456',
    required: true,
  })
  password!: string

  @ValidateString({
    description: '验证码',
    example: '1234',
    required: true,
  })
  captcha!: string

  @ValidateString({
    description: '验证码ID',
    example: 'a1b2c3d4',
    required: true,
  })
  captchaId!: string
}

export class LoginResponseDto {
  @ApiProperty({
    description: '令牌信息',
    type: TokenDto,
    required: true,
  })
  tokens: TokenDto

  @ApiProperty({
    description: '用户信息',
    type: UserDto,
    required: true,
  })
  user: UserDto
}

export class UserRegisterDto extends OmitType(UserDto, [
  'id',
  'status',
  'isRoot',
  'createdAt',
  'updatedAt',
]) {
  @ValidateString({
    description: '密码',
    example: 'Aa@123456',
    required: true,
  })
  password!: string

  @ValidateString({
    description: '密码',
    example: 'Aa@123456',
    required: true,
  })
  confirmPassword!: string
}

export class UpdateUserDto extends OmitType(UserDto, [
  'id',
  'isRoot',
  'createdAt',
  'updatedAt',
]) {}

export class UpdatePasswordDto {
  @ValidateString({
    description: '密码',
    example: 'Aa@123456',
    required: true,
  })
  oldPassword!: string

  @ValidateString({
    description: '密码',
    example: 'Aa@123456',
    required: true,
  })
  newPassword!: string

  @ValidateString({
    description: '密码',
    example: 'Aa@123456',
    required: true,
  })
  confirmPassword!: string
}
