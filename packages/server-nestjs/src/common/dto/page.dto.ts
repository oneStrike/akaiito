import {
  ValidateJson,
  ValidateNumber,
  ValidateString,
} from '@/common/decorators/validate.decorator'

export class PageDto {
  @ValidateNumber({
    description: '单页大小，最大500，默认15',
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
    example: "{id:'desc'}",
    required: false,
  })
  orderBy?: string

  @ValidateString({
    description: '开始时间',
    example: '2025-05-29',
    required: false,
    type: 'ISO8601',
  })
  startDate?: string

  @ValidateString({
    description: '结束时间',
    example: '2025-05-29',
    required: false,
    type: 'ISO8601',
  })
  endDate?: string
}
