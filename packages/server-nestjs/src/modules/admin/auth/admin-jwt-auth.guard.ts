import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator'

/**
 * AdminJwtAuthGuard 类
 * 实现基于 JWT 的管理员用户认证守卫
 * 继承自 AuthGuard，使用 'admin-jwt' 策略
 * 支持通过 @Public() 装饰器跳过特定路由的认证
 */
@Injectable()
export class AdminJwtAuthGuard extends AuthGuard('admin-jwt') {
  /**
   * 构造函数
   * @param reflector 用于获取路由元数据的 Reflector 服务
   */
  constructor(private reflector: Reflector) {
    super()
  }

  /**
   * 判断当前请求是否需要进行认证
   * @param context 执行上下文，包含当前请求信息
   * @returns 如果路由被标记为公共，则返回 true 跳过认证；否则调用父类的 canActivate 方法进行认证
   */
  canActivate(context: ExecutionContext) {
    // 检查路由是否被标记为公共
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // 如果路由被标记为公共，则跳过认证
    if (isPublic) {
      return true
    }
    // 否则调用父类的 canActivate 方法进行认证
    return super.canActivate(context)
  }
}
