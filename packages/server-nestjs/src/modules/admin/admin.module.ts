import { Module } from '@nestjs/common'
import { DictionaryController } from '@/modules/admin/dictionary/dictionary.controller'
import { AdminUploadModule } from '@/modules/admin/upload/upload.module'
import { DictionaryModule } from '@/modules/shared/dictionary/dictionary.module'
import { AdminAuthModule } from './auth/auth.module'
import { AdminLoggerModule } from './logger/admin-logger.module'
import { AdminUserModule } from './users/user.module'

@Module({
  imports: [
    AdminAuthModule,
    AdminUserModule,
    AdminLoggerModule,
    AdminUploadModule,
    DictionaryModule,
  ],
  controllers: [DictionaryController],
})
export class AdminModule {}
