import { Module } from '@nestjs/common'
import { AdminUploadController } from '@/modules/admin/upload/admin-upload.controller'
import { UploadModule } from '@/modules/shared/upload/upload.module'
import { AdminAuthModule } from './auth/auth.module'
import { AdminLoggerModule } from './logger/admin-logger.module'
import { AdminUserModule } from './users/user.module'

@Module({
  imports: [AdminAuthModule, AdminUserModule, AdminLoggerModule, UploadModule],
  controllers: [AdminUploadController],
})
export class AdminModule {}
