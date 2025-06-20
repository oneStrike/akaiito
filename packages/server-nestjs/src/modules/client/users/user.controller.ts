import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CurrentUser } from '@/common/decorators/current-user.decorator'
import { ClientUserService } from '@/modules/client/users/user.service'
import { ClientJwtPayload } from '../auth/client-jwt.service'

@ApiTags('客户端用户模块')
@Controller('client/user')
export class ClientUserController {
  constructor(private readonly userService: ClientUserService) {}

  @Get('getClientUserPage')
  getUsers(@CurrentUser() user: ClientJwtPayload) {
    return this.userService.getUsers()
  }
}
