import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsDate, IsNumber, IsObject, IsOptional, Max } from 'class-validator'

export class PageDto {
  @ApiProperty({ description: '单页大小', example: '15' })
  @IsNumber()
  @IsOptional()
  @Max(500)
  pageSize: number

  @ApiProperty({ description: '页码', example: '0' })
  @IsNumber()
  @IsOptional()
  pageIndex: number

  @ApiProperty({ description: '排序字段，json格式', example: '{id:\'desc\'}' })
  @IsOptional()
  @IsObject()
  @Transform(({ value }) => JSON.parse(value))
  orderBy: Record<string, 'asc' | 'desc'>

  @ApiProperty({ description: '开始时间', example: '2025-05-29' })
  @IsDate()
  @IsOptional()
  startDate: Date

  @ApiProperty({ description: '结束时间', example: '2025-05-29' })
  @IsDate()
  @IsDate()
  @IsOptional()
  endDate: Date
}
