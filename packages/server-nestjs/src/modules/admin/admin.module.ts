import { Module } from '@nestjs/common'
import { UserController } from './users/user.controller'
import { UserService } from './users/user.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class AdminModule {}
