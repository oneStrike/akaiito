import { ApiProperty } from '@nestjs/swagger'
import { ValidateString } from '@/common/decorators/validate.decorator'

export class UploadFileDto {
  @ValidateString({
    description: '文件描述',
    required: false,
    default: 'shared',
  })
  scene?: string
}

export class UploadResponseDto {
  @ApiProperty({ description: '文件名' })
  filename: string

  @ApiProperty({ description: '文件路径' })
  filePath: string

  @ApiProperty({ description: '文件场景' })
  scene: string

  @ApiProperty({ description: '文件大小' })
  fileSize: number

  @ApiProperty({ description: '文件类型mimeType' })
  mimeType: string

  @ApiProperty({ description: '文件类型' })
  fileType: string

  @ApiProperty({ description: '原始文件名' })
  originalName: string

  @ApiProperty({ description: '上传时间' })
  uploadTime: Date
}
