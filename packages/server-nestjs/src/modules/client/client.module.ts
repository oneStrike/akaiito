import { Module } from '@nestjs/common'
import { ClientAuthModule } from './auth/client-auth.module'
import { UserController } from './users/user.controller'
import { UserService } from './users/user.service'

@Module({
  imports: [ClientAuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class ClientModule {}
