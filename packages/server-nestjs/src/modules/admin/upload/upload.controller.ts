import type { FastifyRequest } from 'fastify'
import type { UploadFileDto } from '@/common/dto/upload.dto'
import type { UploadService } from '@/common/services/upload.service'
import { Controller, Post, Query, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc } from '@/common/decorators/api-doc.decorator'
import { UploadResponseDto } from '@/common/dto/upload.dto'

@ApiTags('管理端文件上传')
@Controller('admin/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/uploadFile')
  @ApiDoc({
    summary: '上传文件',
    model: UploadResponseDto,
    isArray: true,
  })
  async uploadMultiple(
    @Req() req: FastifyRequest,
    @Query() query: UploadFileDto,
  ) {
    return this.uploadService.uploadMultipleFiles(req, query.scene)
  }
}
