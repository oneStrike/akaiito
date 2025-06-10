import {
  ValidateNumber,
  ValidateNumberArray,
} from '@/common/decorators/validate.decorator'

export class IdDto {
  @ValidateNumber({
    description: '主键id',
    example: 1,
    required: true,
  })
  id: number
}

export class IdsDto {
  @ValidateNumberArray({
    description: '主键id',
    example: [1, 2, 3],
    required: true,
  })
  ids: number[]
}
