import { UploadService } from '@/service/common/upload.service'
import { Controller, Fields, Files, Inject, Post } from '@midwayjs/core'
import { UploadFileInfo, UploadMiddleware } from '@midwayjs/busboy'

@Controller('/common/upload')
export class UploadController {
  @Inject()
  uploadService: UploadService

  @Post('/uploadFile', { middleware: [UploadMiddleware], summary: '文件上传' })
  async upload(
    @Files() files: Array<UploadFileInfo>, @Fields() fields: Record<string, string>,
  ) {
    return this.uploadService.local(files, fields)
  }
}
