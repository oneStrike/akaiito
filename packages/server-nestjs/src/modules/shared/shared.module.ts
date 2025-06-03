import { Module } from '@nestjs/common'
import { UploadModule } from './upload/upload.module'

/**
 * 共享模块
 * 包含项目中可复用的功能模块
 */
@Module({
  imports: [UploadModule],
  exports: [UploadModule],
})
export class SharedModule {}
