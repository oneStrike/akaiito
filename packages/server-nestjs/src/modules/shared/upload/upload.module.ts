import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { FileValidationService } from './file-validation.service'
import { StorageService } from './storage.service'
import uploadConfig from './upload.config'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

@Module({
  imports: [
    ConfigModule.forFeature(uploadConfig),
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    FileValidationService,
    StorageService,
  ],
  exports: [UploadService, StorageService],
})
export class UploadModule {}
