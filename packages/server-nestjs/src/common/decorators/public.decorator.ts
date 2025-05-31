import { SetMetadata } from '@nestjs/common'

/**
 * 用于标记公共路由的元数据键
 * 被标记为公共的路由将跳过 JWT 鉴权
 */
export const IS_PUBLIC_KEY = 'isPublic'

/**
 * Public 装饰器
 * 用于标记不需要 JWT 鉴权的公共路由
 * 可以应用于控制器方法或整个控制器类
 *
 * 示例:
 * @Public()
 * @Get('login')
 * login() { ... }
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
