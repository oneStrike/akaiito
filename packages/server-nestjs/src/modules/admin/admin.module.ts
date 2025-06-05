import { Module } from '@nestjs/common'
import { AdminAuthModule } from './auth/auth.module'
import { AdminLoggerModule } from './logger/admin-logger.module'
import { AdminUserModule } from './users/user.module'

@Module({
  imports: [AdminAuthModule, AdminUserModule, AdminLoggerModule],
  controllers: [],
})
export class AdminModule {}
