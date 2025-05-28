import { IsDate, IsJSON, IsNumber, IsOptional, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PageDto {
  @ApiProperty({ description: '单页大小', example: '15' })
  @IsNumber()
  @IsOptional()
  @Max(500, { message: '每页最多500条' })
  pageSize?: number;

  @ApiProperty({ description: '页码', example: '0' })
  @IsNumber()
  @IsOptional()
  pageIndex?: number;

  @ApiProperty({ description: '排序字段，json格式', example: "{id:'desc'}" })
  @IsJSON({ message: '【orderBy】只允许json格式' })
  @IsOptional()
  orderBy?: string;

  @ApiProperty({ description: '记录开始时间', example: '2025-05-29' })
  @IsDate({ message: '【startDate】只允许上传日期格式' })
  @IsOptional()
  startDate?: Date;

  @ApiProperty({ description: '记录结束时间', example: '2025-05-29' })
  @IsDate({ message: '【endDate】只允许上传日期格式' })
  @IsDate()
  @IsOptional()
  endDate?: Date;
}
