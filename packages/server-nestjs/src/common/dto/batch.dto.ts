import { ApiProperty } from '@nestjs/swagger'
import {
  ValidateBoolean,
  ValidateNumberArray,
} from '@/common/decorators/validate.decorator'

export class BatchOperationResultDto {
  @ApiProperty({
    description: '操作成功的数据量',
    example: true,
  })
  count!: number
}

export class BatchOperationStatusIdsDto {
  @ValidateNumberArray({
    description: '批量操作的 ID 数组',
    example: [1, 2, 3],
  })
  ids!: number[]

  @ValidateBoolean({
    description: '启用或者禁用',
    example: true,
  })
  isEnabled!: boolean
}

export class CountDto {
  @ApiProperty({
    description: '操作成功的数据数量',
    example: 1,
  })
  count!: number
}
