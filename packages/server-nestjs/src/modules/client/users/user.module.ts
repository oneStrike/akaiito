import { Module } from '@nestjs/common'
import { AdminAuthModule } from '@/modules/admin/auth/auth.module' // 导入 AdminAuthModule
import { ClientUserController } from './user.controller'
import { ClientUserService } from './user.service'

@Module({
  imports: [AdminAuthModule],
  controllers: [ClientUserController],
  providers: [ClientUserService],
  exports: [],
})
export class ClientUserModule {}
