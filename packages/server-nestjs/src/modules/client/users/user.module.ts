import { Module } from '@nestjs/common'
import { AdminAuthModule } from '@/modules/admin/auth/auth.module' // 导入 AdminAuthModule
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [AdminAuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class ClientUserModule {}
