import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger'
import { PageDto } from '@/common/dto/page.dto'
import { useClassSerializerInterceptor } from '@/common/serializers/class-transformer.serializer'
import { UserDto } from '@/modules/admin/users/dto/user.dto'
import { UserService } from '@/modules/admin/users/user.service'

@ApiTags('管理端用户模块')
@Controller('admin/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAdminUserPage')
  @ApiOperation({
    summary: '获取管理端用户分页列表',
  })
  @ApiResponse({
    status: 200,
    description: '获取管理端用户分页列表成功',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath(UserDto) },
        },
      },
    },
  })
  @UseInterceptors(useClassSerializerInterceptor(UserDto))
  getUsers(@Query() query: PageDto) {
    console.log(query)
    return this.userService.getUsers()
  }

  @Post('createAdminUser')
  @ApiOperation({ summary: '创建管理端用户' })
  createUser(@Body() body: UserDto) {
    return 'createUser'
  }
}
