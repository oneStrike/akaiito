import { ApiProperty } from '@nestjs/swagger'
import { ValidateBoolean } from '@/common/decorators/validate.decorator'
import { IdsDto } from './id.dto'

export class BatchOperationResultDto {
  @ApiProperty({
    description: '操作成功的数据量',
    example: true,
  })
  count!: number
}

export class BatchEnabledDto extends IdsDto {
  @ValidateBoolean({
    description: '启用或者禁用',
    example: true,
  })
  isEnabled!: boolean
}

export class BatchPublishDto extends IdsDto {
  @ValidateBoolean({
    description: '发布或者取消发布',
    example: true,
  })
  isPublished!: boolean
}

export class CountDto {
  @ApiProperty({
    description: '操作成功的数据数量',
    example: 1,
  })
  count!: number
}
