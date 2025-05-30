import {
  ValidateDate,
  ValidateJson,
  ValidateNumber,
} from '@/common/decorators/validate.decorator'

export class PageDto {
  @ValidateNumber({
    description: '单页大小',
    example: 15,
    max: 500,
    min: 1,
    required: false,
    default: 15,
  })
  pageSize?: number

  @ValidateNumber({
    description: '当前页码',
    example: 0,
    min: 0,
    required: false,
    default: 0,
  })
  pageIndex?: number

  @ValidateJson({
    description: '排序字段，json格式',
    example: '{id:\'desc\'}',
    transform: true,
    required: false,
  })
  orderBy?: Record<string, 'asc' | 'desc'>

  @ValidateDate({
    description: '开始时间',
    example: '2025-05-29',
    required: false,
  })
  startDate?: Date | null

  @ValidateDate({
    description: '结束时间',
    example: '2025-05-29',
    required: false,
  })
  endDate?: Date | null
}
