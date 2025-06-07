import { Controller, Post, Query, Req } from '@nestjs/common'
import { ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { ApiDoc } from '@/common/decorators/api-doc.decorator'
import { UploadFileDto, UploadResponseDto } from '@/common/dto/upload.dto'
import { UploadService } from '@/common/services/upload.service'

@ApiTags('管理端文件上传')
@Controller('admin/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/file')
  @ApiConsumes('multipart/form-data')
  @ApiDoc({
    summary: '上传文件',
    model: UploadResponseDto,
    isArray: true,
  })
  async uploadMultiple(
    @Req() req: FastifyRequest,
    @Query() query: UploadFileDto,
  ) {
    console.log(query)
    return this.uploadService.uploadMultipleFiles(req, query.scene)
  }
}
