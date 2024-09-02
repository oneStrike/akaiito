import { Controller, Inject, Post, Files, Fields } from '@midwayjs/core'
import { UploadService } from './upload.service'
import { UploadFileInfo, UploadMiddleware } from '@midwayjs/busboy'

@Controller('/common/upload')
export class HomeController {
  @Inject()
  uploadService: UploadService

  @Post('/uploadFile', { middleware: [UploadMiddleware] })
  async upload(
    @Files() files: Array<UploadFileInfo>,
    @Fields() fields: Record<string, string>
  ) {
    return this.uploadService.local(files, fields)
  }
}
