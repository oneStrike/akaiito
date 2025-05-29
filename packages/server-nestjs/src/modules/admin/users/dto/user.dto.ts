import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { IsNumber, IsString, MaxLength } from 'class-validator'

export class UserDto {
  @ApiProperty({
    description: '用户ID',
    example: 1,
  })
  @IsNumber()
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
