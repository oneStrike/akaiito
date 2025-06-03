import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator'

/**
 * 文件上传响应DTO
 */
export class FileUploadResponseDto {
  @ApiProperty({ description: '文件ID' })
  id: string

  @ApiProperty({ description: '原始文件名' })
  originalName: string

  @ApiProperty({ description: '存储文件名' })
  fileName: string

  @ApiProperty({ description: '文件路径' })
  filePath: string

  @ApiProperty({ description: '文件大小（字节）' })
  size: number

  @ApiProperty({ description: 'MIME类型' })
  mimeType: string

  @ApiProperty({ description: '文件扩展名' })
  extension: string

  @ApiProperty({ description: '上传时间' })
  uploadTime: Date

  @ApiProperty({ description: '文件URL' })
  url: string
}

/**
 * 多文件上传响应DTO
 */
export class MultipleFileUploadResponseDto {
  @ApiProperty({
    description: '成功上传的文件列表',
    type: [FileUploadResponseDto],
  })
  successFiles: FileUploadResponseDto[]

  @ApiProperty({ description: '上传失败的文件列表' })
  failedFiles: {
    originalName: string
    error: string
  }[]

  @ApiProperty({ description: '总文件数' })
  totalFiles: number

  @ApiProperty({ description: '成功上传数' })
  successCount: number

  @ApiProperty({ description: '失败上传数' })
  failedCount: number
}

/**
 * 文件上传查询DTO
 */
export class FileUploadQueryDto {
  @ApiProperty({ description: '页码', required: false, default: 1 })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(1)
  page?: number = 1

  @ApiProperty({ description: '每页数量', required: false, default: 10 })
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10

  @ApiProperty({ description: '文件类型过滤', required: false })
  @IsOptional()
  @IsString()
  mimeType?: string

  @ApiProperty({ description: '文件名搜索', required: false })
  @IsOptional()
  @IsString()
  fileName?: string

  @ApiProperty({ description: '开始日期', required: false })
  @IsOptional()
  @IsString()
  startDate?: string

  @ApiProperty({ description: '结束日期', required: false })
  @IsOptional()
  @IsString()
  endDate?: string
}

/**
 * 文件删除DTO
 */
export class FileDeleteDto {
  @ApiProperty({ description: '文件ID列表' })
  @IsArray()
  @IsString({ each: true })
  fileIds: string[]
}

/**
 * 文件信息DTO
 */
export class FileInfoDto {
  @ApiProperty({ description: '文件ID' })
  id: string

  @ApiProperty({ description: '原始文件名' })
  originalName: string

  @ApiProperty({ description: '文件大小（字节）' })
  size: number

  @ApiProperty({ description: 'MIME类型' })
  mimeType: string

  @ApiProperty({ description: '上传时间' })
  uploadTime: Date

  @ApiProperty({ description: '文件状态' })
  status: 'active' | 'deleted'

  @ApiProperty({ description: '上传用户ID', required: false })
  uploaderId?: string
}

/**
 * 文件上传配置响应DTO
 */
export class UploadConfigResponseDto {
  @ApiProperty({ description: '最大文件大小（字节）' })
  maxFileSize: number

  @ApiProperty({ description: '最大文件数量' })
  maxFiles: number

  @ApiProperty({ description: '允许的文件类型' })
  allowedMimeTypes: string[]

  @ApiProperty({ description: '允许的文件扩展名' })
  allowedExtensions: string[]
}
