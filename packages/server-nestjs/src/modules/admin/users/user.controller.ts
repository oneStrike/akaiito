import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '@/modules/admin/users/user.service';
import { PageDto } from '@/common/dto/page.dto';

@ApiTags('管理端用户模块')
@Controller('admin/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAdminUserPage')
  @ApiOperation({ summary: '获取管理端用户分页列表' })
  getUsers(@Query() query: PageDto) {
    console.log(query);
    return this.userService.getUsers();
  }
}
