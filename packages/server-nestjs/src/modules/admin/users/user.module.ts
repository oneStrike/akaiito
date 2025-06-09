import { Module } from '@nestjs/common'
import { CryptoService } from '@/common/module/jwt/crypto.service'
import { AdminAuthModule } from '@/modules/admin/auth/auth.module' // 导入 AdminAuthModule
import { UserController } from '@/modules/admin/users/user.controller'
import { UserService } from '@/modules/admin/users/user.service'

@Module({
  imports: [AdminAuthModule], // 添加 AdminAuthModule 到 imports 数组
  controllers: [UserController],
  providers: [UserService, CryptoService],
  exports: [],
})
export class AdminUserModule {}
