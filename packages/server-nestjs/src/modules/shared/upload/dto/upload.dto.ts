import { IsOptional, IsString, IsEnum, IsArray, ValidateNested } from 'class-validator'
import { Type, Transform } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

/**
 * 文件类型枚举
 */
export enum FileTypeEnum {
  IMAGE = 'images',
  VIDEO = 'videos',
  DOCUMENT = 'documents',
  AUDIO = 'audios',
  OTHER = 'others',
}

/**
 * 子项目枚举
 */
export enum ProjectEnum {
  ADMIN = 'admin',
  APP = 'app',
  CLIENT = 'client',
}

/**
 * 文件上传请求 DTO
 */
export class UploadFileDto {
  @ApiPropertyOptional({
    description: '上传场景',
    default: 'shared',
    example: 'avatar',
  })
  @IsOptional()
  @IsString()
  scene?: string = 'shared'

  @ApiProperty({
    description: '子项目标识',
    enum: ProjectEnum,
    example: ProjectEnum.ADMIN,
  })
  @IsEnum(ProjectEnum)
  project: ProjectEnum

  @ApiPropertyOptional({
    description: '文件类型',
    enum: FileTypeEnum,
    example: FileTypeEnum.IMAGE,
  })
  @IsOptional()
  @IsEnum(FileTypeEnum)
  fileType?: FileTypeEnum
}

/**
 * 多文件上传请求 DTO
 */
export class UploadMultipleFilesDto extends UploadFileDto {
  @ApiPropertyOptional({
    description: '最大文件数量',
    default: 10,
    example: 5,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  maxCount?: number = 10
}

/**
 * 文件信息响应 DTO
 */
export class FileInfoDto {
  @ApiProperty({ description: '文件名' })
  filename: string

  @ApiProperty({ description: '原始文件名' })
  originalname: string

  @ApiProperty({ description: '文件大小（字节）' })
  size: number

  @ApiProperty({ description: 'MIME 类型' })
  mimetype: string

  @ApiProperty({ description: '文件路径' })
  path: string

  @ApiProperty({ description: '访问 URL' })
  url: string

  @ApiProperty({ description: '文件类型' })
  fileType: FileTypeEnum

  @ApiProperty({ description: '上传时间' })
  uploadTime: Date

  @ApiProperty({ description: '文件哈希值' })
  hash: string
}

/**
 * 单文件上传响应 DTO
 */
export class UploadSingleFileResponseDto {
  @ApiProperty({ description: '是否成功' })
  success: boolean

  @ApiProperty({ description: '响应消息' })
  message: string

  @ApiProperty({ description: '文件信息', type: FileInfoDto, required: false })
  @ValidateNested()
  @Type(() => FileInfoDto)
  @IsOptional()
  data: FileInfoDto | null

  @ApiProperty({ description: '上传耗时（毫秒）' })
  duration: number
}

/**
 * 多文件上传响应 DTO
 */
export class UploadMultipleFilesResponseDto {
  @ApiProperty({ description: '是否成功' })
  success: boolean

  @ApiProperty({ description: '响应消息' })
  message: string

  @ApiProperty({ description: '文件信息列表', type: [FileInfoDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => FileInfoDto)
  @IsArray()
  @IsOptional()
  data: FileInfoDto[] | null

  @ApiProperty({ description: '成功上传数量' })
  successCount: number

  @ApiProperty({ description: '失败上传数量' })
  failedCount: number

  @ApiProperty({ description: '上传耗时（毫秒）' })
  duration: number

  @ApiPropertyOptional({ description: '失败文件列表' })
  @IsOptional()
  failedFiles?: Array<{
    filename: string
    error: string
  }>
}
