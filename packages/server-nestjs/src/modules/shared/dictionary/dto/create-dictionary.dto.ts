import {
  ValidateBoolean,
  ValidateString,
} from '@/common/decorators/validate.decorator'

/**
 * 创建数据字典DTO
 */
export class CreateDictionaryDto {
  @ValidateString({
    description: '字典名称',
    example: '用户状态',
    required: true,
    maxLength: 50,
    minLength: 1,
  })
  name!: string

  @ValidateString({
    description: '字典编码',
    example: 'user_status',
    required: true,
    maxLength: 50,
    minLength: 1,
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
    required: false,
    default: true,
  })
  isEnabled?: boolean

  @ValidateString({
    description: '备注信息',
    example: '用户状态字典',
    required: false,
    maxLength: 255,
  })
  remark?: string
}
