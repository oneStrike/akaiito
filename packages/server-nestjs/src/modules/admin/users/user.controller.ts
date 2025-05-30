import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { PageDto } from '@/common/dto/page.dto'
import { useClassSerializerInterceptor } from '@/common/serializers/class-transformer.serializer'
import { UserDto, UserLoginDto } from '@/modules/admin/users/dto/user.dto'
import { UserService } from '@/modules/admin/users/user.service'
import { CaptchaDto } from './dto/captcha.dto'

@ApiTags('管理端用户模块')
@Controller('admin/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getCaptcha')
  @ApiDoc('获取验证码', CaptchaDto)
  getCaptcha() {
    return this.userService.getCaptcha()
  }

  @Post('login')
  @ApiDoc('用户登录', UserLoginDto)
  login(@Body() body: UserLoginDto) {
    return this.userService.login(body)
  }

  @Get('getAdminUserPage')
  @ApiPageDoc('获取管理端用户分页列表', UserDto)
  @UseInterceptors(useClassSerializerInterceptor(UserDto))
  getUsers(@Query() query: PageDto) {
    console.log(query)
    return this.userService.getUsers()
  }
}
