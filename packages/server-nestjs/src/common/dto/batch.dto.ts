import { ApiProperty } from '@nestjs/swagger'

export class BatchOperationResultDto {
  @ApiProperty({
    description: '操作成功的数据亮',
    example: true,
  })
  count!: number
}
