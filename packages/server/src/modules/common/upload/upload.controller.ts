import { UploadService } from '@/service/common/upload.service'
import { Controller, Fields, Files, Inject, Post } from '@midwayjs/core'
import { UploadMiddleware, UploadStreamFieldInfo, UploadStreamFileInfo } from '@midwayjs/busboy'

@Controller('/common/upload')
export class UploadController {
  @Inject()
  uploadService: UploadService

  @Post('/uploadFile', { middleware: [UploadMiddleware], summary: '文件上传' })
  async upload(
    @Files() fileIterator: AsyncGenerator<UploadStreamFileInfo>,
    @Fields() fieldIterator: AsyncGenerator<UploadStreamFieldInfo>,
  ) {
    return this.uploadService.local(fileIterator, fieldIterator)
  }
}
