import {
  getUserInfoHandler,
  USERINFO_KEY,
} from '@/decorator/userinfo.decorator'
import { Inject, MidwayDecoratorService, Singleton } from '@midwayjs/core'

@Singleton()
export class DecoratorService {
  @Inject()
  decoratorService: MidwayDecoratorService

  register() {
    // 从数据库获取最新用户信息
    this.decoratorService.registerMethodHandler(
      USERINFO_KEY,
      getUserInfoHandler,
    )
  }
}
