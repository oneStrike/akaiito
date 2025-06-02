import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { IsString, MaxLength } from 'class-validator'
import {
  ValidateNumber,
  ValidateString,
} from '@/common/decorators/validate.decorator'

export class UserDto {
  @ValidateNumber({
    description: '用户ID',
    example: 1,
    required: true,
    min: 1,
  })
  id!: number

  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  @IsString()
  @MaxLength(20)
  username!: string

  @ApiProperty({
    description: '密码',
    example: 'Aa@123456',
  })
  @ApiHideProperty()
  @Exclude()
  password: string

  @ApiProperty({
    description: '用户头像',
  })
  avatar?: string

  @ApiProperty({
    description: '用户手机号',
    example: '13800138000',
  })
  mobile?: string

  @ApiProperty({
    description: '用户状态',
    example: true,
  })
  status: boolean

  @ApiProperty({
    description: '是否为超级管理员',
    example: true,
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
    minLength: 6,
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

  @ApiProperty({
    description: '密码是否经过RSA加密',
    example: false,
    required: false,
    default: false,
  })
  encrypted?: boolean
}

export class RefreshTokenDto {
  @ValidateString({
    description: '刷新令牌',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  })
  refreshToken!: string
}
