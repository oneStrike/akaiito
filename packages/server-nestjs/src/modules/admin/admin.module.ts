import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { MaxMindModule } from '@/common/module/maxmind/maxmind.module'
import { DictionaryController } from '@/modules/admin/dictionary/dictionary.controller'
import { AdminRequestLogInterceptor } from '@/modules/admin/request-log/interceptors/request-log.interceptor'
import { AdminUploadModule } from '@/modules/admin/upload/upload.module'
import { DictionaryModule } from '@/modules/shared/dictionary/dictionary.module'
import { AdminAuthModule } from './auth/auth.module'
import { AdminLoggerModule } from './logger/admin-logger.module'
import { AdminMaxMindModule } from './maxmind/maxmind.module'
import { RequestLogModule } from './request-log/request-log.module'
import { AdminUserModule } from './users/user.module'

@Module({
  imports: [
    AdminAuthModule,
    AdminUserModule,
    AdminLoggerModule,
    RequestLogModule,
    AdminUploadModule,
    DictionaryModule,
    AdminMaxMindModule,
    MaxMindModule,
  ],
  controllers: [DictionaryController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AdminRequestLogInterceptor,
    },
  ],
})
export class AdminModule {}
