import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string
}

export class MultipleFileUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string
}
