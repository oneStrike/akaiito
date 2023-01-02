import { Controller, Fields, Files, Inject, Post } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { UploadService } from './upload.service'
@Controller('/common/upload')
export class UploadController extends BaseController {
  @Inject()
  uploadService: UploadService

  @Post('/upload', { summary: '上传静态资源' })
  async upload(@Files() files, @Fields() fields) {
    return await this.uploadService.publicFileStorageMethod(files, fields)
  }
}
