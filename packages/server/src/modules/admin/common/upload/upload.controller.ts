import { Controller, Inject, Post, Files, Fields } from '@midwayjs/core'
import { UploadService } from './upload.service'

@Controller('/common/upload')
export class HomeController {
  @Inject()
  uploadService: UploadService

  @Post('/uploadFile')
  async upload(@Files() files, @Fields() fields) {
    return this.uploadService.local(files, fields)
  }
}
