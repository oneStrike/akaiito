import { Module } from '@nestjs/common'
import { AdminUploadModule } from '@/modules/admin/upload/upload.module'
import { SharedModule } from '@/modules/shared/shared.module'
import { AdminAuthModule } from './auth/auth.module'
import { AdminLoggerModule } from './logger/admin-logger.module'
import { AdminUserModule } from './users/user.module'

@Module({
  imports: [
    AdminAuthModule,
    AdminUserModule,
    AdminLoggerModule,
    AdminUploadModule,
    SharedModule,
  ],
})
export class AdminModule {}
