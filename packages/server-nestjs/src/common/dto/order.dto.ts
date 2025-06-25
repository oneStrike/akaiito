import { ValidateNumber } from '@/common/decorators/validate.decorator'

export class OrderDto {
  @ValidateNumber({
    description: '拖拽的目标id',
    required: true,
    example: 1,
  })
  targetId!: number

  @ValidateNumber({
    description: '当前拖拽数据的id',
    required: true,
    example: 2,
  })
  dragId!: number
}
