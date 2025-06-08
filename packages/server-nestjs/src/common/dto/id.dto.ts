import { ValidateNumber } from '@/common/decorators/validate.decorator'

export class IdDto {
  @ValidateNumber({
    description: '主键id',
    example: 1,
    required: true,
  })
  id: number
}
