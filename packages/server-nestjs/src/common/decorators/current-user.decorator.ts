import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AdminJwtPayload } from '@/modules/admin/auth/admin-jwt.service'
import { ClientJwtPayload } from '@/modules/client/auth/client-jwt.service'

/**
 * CurrentUser 装饰器
 * 用于从请求中提取当前用户的信息
 * 支持 Admin 和 Client 模块的 JWT Payload 类型
 *
 * 示例:
 * @Get('profile')
 * getProfile(@CurrentUser() user: AdminJwtPayload) {
 *   return { username: user.username };
 * }
 */
export const CurrentUser = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext,
  ): AdminJwtPayload | ClientJwtPayload => {
    const request = ctx.switchToHttp().getRequest()
    return request.user
  },
)
