import { Module } from '@nestjs/common'
import { AdminAuthModule } from './auth/admin-auth.module'
import { UserController } from './users/user.controller'
import { UserService } from './users/user.service'

@Module({
  imports: [AdminAuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class AdminModule {}
