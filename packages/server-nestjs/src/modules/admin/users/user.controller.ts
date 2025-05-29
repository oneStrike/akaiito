import type { PageDto } from '@/common/dto/page.dto'
import type { UserService } from '@/modules/admin/users/user.service'
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { useClassSerializerInterceptor } from '@/common/serializers/class-transformer.serializer'
import { UserDto } from '@/modules/admin/users/dto/user.dto'

@ApiTags('管理端用户模块')
@Controller('admin/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAdminUserPage')
  @ApiPageDoc('获取管理端用户分页列表', UserDto)
  @UseInterceptors(useClassSerializerInterceptor(UserDto))
  getUsers(@Query() query: PageDto) {
    return this.userService.getUsers()
  }

  @Post('createAdminUser')
  @ApiOperation({ summary: '创建管理端用户' })
  createUser(@Body() body: UserDto) {
    return 'createUser'
  }
}
