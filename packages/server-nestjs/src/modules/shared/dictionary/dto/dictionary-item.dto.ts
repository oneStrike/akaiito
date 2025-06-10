import {
  ValidateBoolean,
  ValidateNumber,
  ValidateString,
} from '@/common/decorators/validate.decorator'
import { IdDto } from '@/common/dto/id.dto'

/**
 * 创建数据字典项DTO
 */
export class CreateDictionaryItemDto {
  @ValidateString({
    description: '字典编码',
    example: 'user_status',
    required: true,
    maxLength: 50,
    minLength: 1,
  })
  dictionaryCode!: string

  @ValidateString({
    description: '字典项名称',
    example: '启用',
    required: true,
    maxLength: 50,
    minLength: 1,
  })
  name!: string

  @ValidateString({
    description: '字典项编码',
    example: 'enabled',
    required: true,
    maxLength: 50,
    minLength: 1,
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
    required: false,
    default: true,
  })
  isEnabled?: boolean

  @ValidateString({
    description: '备注信息',
    example: '启用状态',
    required: false,
    maxLength: 255,
  })
  remark?: string
}

/**
 * 更新数据字典项DTO
 */
export class UpdateDictionaryItemDto extends IdDto {
  @ValidateString({
    description: '字典项名称',
    example: '启用',
    required: false,
    maxLength: 50,
    minLength: 1,
  })
  name?: string

  @ValidateString({
    description: '字典项编码',
    example: 'enabled',
    required: false,
    maxLength: 50,
    minLength: 1,
  })
  code?: string

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
    required: false,
  })
  isEnabled?: boolean

  @ValidateString({
    description: '备注信息',
    example: '启用状态',
    required: false,
    maxLength: 255,
  })
  remark?: string
}
