import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AdminJwtAuthGuard } from '@/modules/admin/auth/admin-jwt-auth.guard'
import { AdminUserModule } from '@/modules/admin/users/user.module'
import { AdminAuthModule } from './auth/auth.module'

@Module({
  imports: [AdminAuthModule, AdminUserModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AdminJwtAuthGuard,
    },
  ],
})
export class AdminModule {}
