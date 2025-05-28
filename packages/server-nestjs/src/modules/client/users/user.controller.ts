import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '@/modules/client/users/user.service';

@ApiTags('客户端用户模块')
@Controller('client/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getClientUserPage')
  getUsers() {
    return this.userService.getUsers();
  }
}
