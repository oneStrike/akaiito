import { ApiProperty } from '@nestjs/swagger'
import {
  ValidateBoolean,
  ValidateNumber,
  ValidateString,
} from '@/common/decorators/validate.decorator'

/**
 * 数据字典响应DTO
 */
export class DictionaryDto {
  @ValidateNumber({
    description: '字典ID',
    example: 1,
    required: true,
    min: 1,
  })
  id!: number

  @ValidateString({
    description: '字典名称',
    example: '用户状态',
    required: true,
    maxLength: 50,
  })
  name!: string

  @ValidateString({
    description: '字典编码',
    example: 'user_status',
    required: true,
    maxLength: 50,
  })
  code!: string

  @ValidateString({
    description: '字典封面',
    example: 'https://example.com/cover.png',
    required: false,
    maxLength: 200,
  })
  cover?: string

  @ValidateBoolean({
    description: '状态 true启用 false禁用',
    example: true,
    required: true,
  })
  isEnabled!: boolean

  @ValidateString({
    description: '备注信息',
    example: '用户状态字典',
    required: false,
    maxLength: 255,
  })
  remark?: string

  @ApiProperty({
    description: '创建时间',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt!: Date

  @ApiProperty({
    description: '更新时间',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt!: Date
}

/**
 * 数据字典项响应DTO
 */
export class DictionaryItemDto {
  @ValidateNumber({
    description: '字典项ID',
    example: 1,
    required: true,
    min: 1,
  })
  id!: number

  @ValidateString({
    description: '字典编码',
    example: 'user_status',
    required: true,
    maxLength: 50,
  })
  dictionaryCode!: string

  @ValidateString({
    description: '字典项名称',
    example: '启用',
    required: true,
    maxLength: 50,
  })
  name!: string

  @ValidateString({
    description: '字典项编码',
    example: 'enabled',
    required: true,
    maxLength: 50,
  })
  code!: string

  @ValidateNumber({
    description: '排序',
    example: 1,
    required: false,
    min: 0,
  })
  order?: number

  @ValidateString({
    description: '字典项封面',
    example: 'https://example.com/item-cover.png',
    required: false,
    maxLength: 200,
  })
  cover?: string

  @ValidateBoolean({
    description: '状态 true启用 false禁用',
    example: true,
    required: true,
  })
  isEnabled!: boolean

  @ValidateString({
    description: '备注信息',
    example: '启用状态',
    required: false,
    maxLength: 255,
  })
  remark?: string

  @ApiProperty({
    description: '创建时间',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt!: Date

  @ApiProperty({
    description: '更新时间',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt!: Date
}
