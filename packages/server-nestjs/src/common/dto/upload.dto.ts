import { ApiProperty } from '@nestjs/swagger'
import { ValidateString } from '@/common/decorators/validate.decorator'

export class FileUploadDto {
  @ValidateString({
    description: '上传场景，如果不传默认为shared',
    example: 'profile',
    required: false,
  })
  scene?: string
}

/**
 * 文件上传响应DTO
 */
export class FileUploadResponseDto {
  @ApiProperty({ description: '存储文件名' })
  fileName: string

  @ApiProperty({ description: '文件路径' })
  filePath: string

  @ApiProperty({ description: '文件大小（字节）' })
  size: number

  @ApiProperty({ description: 'MIME类型' })
  mimeType: string
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

  @ApiProperty({
    description: '上传失败的文件列表',
    type: [Object],
  })
  failedFiles: { originalName: string; error: string }[]
}

/**
 * 文件信息DTO
 */
export class FileInfoDto {
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

  @ApiProperty({ description: '上传者ID', required: false })
  uploaderId?: string
}

/**
 * 上传配置响应DTO
 */
export class UploadConfigResponseDto {
  @ApiProperty({ description: '最大文件大小（字节）' })
  maxFileSize: number

  @ApiProperty({ description: '最大文件数量' })
  maxFiles: number

  @ApiProperty({ description: '允许的MIME类型', type: [String] })
  allowedMimeTypes: string[]

  @ApiProperty({ description: '允许的文件扩展名', type: [String] })
  allowedExtensions: string[]
}

/**
 * 文件删除DTO
 */
export class FileDeleteDto {
  @ApiProperty({ description: '要删除的文件ID列表', type: [String] })
  fileIds: string[]
}
