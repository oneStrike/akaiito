import { Body, Controller, Post, Req } from '@nestjs/common'
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
  @ApiDoc(`文件上传`, UploadResponseDto)
  @ApiConsumes('multipart/form-data')
  async uploadMultiple(
    @Req() req: FastifyRequest,
    @Body() body: UploadFileDto,
  ) {
    return this.uploadService.uploadMultipleFiles(req)
  }
}
