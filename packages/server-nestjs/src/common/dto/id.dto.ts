import { ValidateNumber } from '@/common/decorators/validate.decorator'

export class IdDto {
  @ValidateNumber({
    description: 'id',
    example: 1,
    required: true,
  })
  id: number
}
