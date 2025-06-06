import { MultipartFile } from '@fastify/multipart'
import { BadRequestException, Controller, Post, Req } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { FileUploadDto, MultipleFileUploadDto } from '@/common/dto/upload.dto'
import { UploadService } from './upload.service'

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @ApiOperation({ summary: '单文件上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  async uploadSingle(@Req() req: FastifyRequest) {
    try {
      console.log(req)
      const data = await req.file()
      if (!data) {
        throw new BadRequestException('未找到上传文件')
      }

      const result = await this.uploadService.uploadSingleFile({
        file: () => data,
      })

      return {
        success: true,
        message: '文件上传成功',
        data: result,
      }
    } catch (error) {
      throw new BadRequestException(error.message || '文件上传失败')
    }
  }

  @Post('multiple')
  @ApiOperation({ summary: '多文件上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: MultipleFileUploadDto })
  async uploadMultiple(@Req() req: FastifyRequest) {
    try {
      const parts = req.parts()
      const files: MultipartFile[] = []

      for await (const part of parts) {
        if (part.type === 'file') {
          files.push(part)
        }
      }

      if (files.length === 0) {
        throw new BadRequestException('未找到上传文件')
      }

      const results = []
      for (const file of files) {
        const result = await this.uploadService.uploadSingleFile({
          file: () => file,
        })
        results.push(result)
      }

      return {
        success: true,
        message: '文件上传成功',
        data: results,
      }
    } catch (error) {
      throw new BadRequestException(error.message || '文件上传失败')
    }
  }
}
