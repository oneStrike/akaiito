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
}
