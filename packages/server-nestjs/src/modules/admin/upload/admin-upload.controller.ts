import { join } from 'node:path'
import { Controller, Post, Query, UseInterceptors } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc } from '@/common/decorators/api-doc.decorator'
import {
  FileUploadDto,
  MultipleFileUploadResponseDto,
} from '@/common/dto/upload.dto'
import { createMulterConfig, UploadConfig } from '@/config/upload.config'
import { UploadService } from '@/modules/shared/upload/upload.service'

@ApiTags('管理端文件上传')
@Controller('/admin/upload')
export class AdminUploadController {
  // 实现管理员上传服务的逻辑
  private readonly uploadConfig: UploadConfig
  constructor(
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) {
    this.uploadConfig = this.configService.get<UploadConfig>('upload')!
    console.log(this.uploadConfig)
  }

  @Post('/uploadFile')
  @ApiDoc('文件上传', MultipleFileUploadResponseDto)
  @UseInterceptors(
    FilesInterceptor(
      'files',
      5,
      createMulterConfig({
        maxFileSize: uploadConfig.maxFileSize,
        maxFiles: 5,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
        ],
        allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.pdf'],
        uploadDir: join(process.cwd(), 'uploads'),
        preserveOriginalName: false,
      }),
    ),
  )
  async uploadFile(@Query() query: FileUploadDto) {
    console.log(query)
    return 'uploadFile'
  }
}
