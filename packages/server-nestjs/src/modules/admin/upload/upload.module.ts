import { Module } from '@nestjs/common'
import { UploadService } from '@/common/services/upload.service'
import { UploadController } from '@/modules/admin/upload/upload.controller'

@Module({
  providers: [UploadService],
  controllers: [UploadController],
  exports: [UploadService],
})
export class AdminUploadModule {}
