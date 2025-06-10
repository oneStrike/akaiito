import {
  ValidateBoolean,
  ValidateString,
} from '@/common/decorators/validate.decorator'
import { PageDto } from '@/common/dto/page.dto'

/**
 * 查询数据字典DTO
 */
export class QueryDictionaryDto extends PageDto {
  @ValidateString({
    description: '字典名称（模糊查询）',
    example: '用户',
    required: false,
    maxLength: 50,
  })
  name?: string

  @ValidateString({
    description: '字典编码（模糊查询）',
    example: 'user',
    required: false,
    maxLength: 50,
  })
  code?: string

  @ValidateBoolean({
    description: '状态筛选',
    example: true,
    required: false,
  })
  isEnabled?: boolean
}

/**
 * 查询数据字典项DTO
 */
export class QueryDictionaryItemDto extends PageDto {
  @ValidateString({
    description: '字典编码',
    example: 'user_status',
    required: true,
    maxLength: 50,
  })
  dictionaryCode!: string

  @ValidateString({
    description: '字典项名称（模糊查询）',
    example: '启用',
    required: false,
    maxLength: 50,
  })
  name?: string

  @ValidateString({
    description: '字典项编码（模糊查询）',
    example: 'enabled',
    required: false,
    maxLength: 50,
  })
  code?: string

  @ValidateBoolean({
    description: '状态筛选',
    example: true,
    required: false,
  })
  isEnabled?: boolean
}
