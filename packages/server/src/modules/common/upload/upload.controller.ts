import type { UploadFileInfo } from '@midwayjs/busboy'
import { UploadService } from './upload.service'
import { UploadMiddleware } from '@midwayjs/busboy'
import { Controller, Fields, Files, Inject, Post } from '@midwayjs/core'

@Controller('/common/upload')
export class HomeController {
  @Inject()
  uploadService: UploadService

  @Post('/uploadFile', { middleware: [UploadMiddleware] })
  async upload(
    @Files() files: Array<UploadFileInfo>,
    @Fields() fields: Record<string, string>,
  ) {
    return this.uploadService.local(files, fields)
  }
}
