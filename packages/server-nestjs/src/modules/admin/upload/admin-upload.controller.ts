import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFiles,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc } from '@/common/decorators/api-doc.decorator'
import { MultipleFileUpload } from '@/common/decorators/upload.decorator'
import {
  FileUploadDto,
  MultipleFileUploadResponseDto,
} from '@/common/dto/upload.dto'
import { UploadConfig } from '@/config/upload.config'
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
  }

  @Post('/uploadFile')
  @MultipleFileUpload()
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: FileUploadDto,
  ) {
    // 检查 files 是否为空
    if (!files || files.length === 0) {
      throw new BadRequestException('未提供要上传的文件')
    }
    return await this.uploadService.uploadMultipleFiles(files, body.scene)
  }
}
