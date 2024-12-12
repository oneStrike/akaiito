import { MidwayDecoratorService } from '@midwayjs/core'
import {
  getUserInfoHandler,
  USERINFO_KEY,
} from '@/decorator/userinfo.decorator'
import { Inject, Singleton } from '@midwayjs/core'
import {
  APP_REQUEST_PLATFORM,
  getAppRequestPlatformHandler,
} from '@/decorator/appRequestClient.decorator'
import { SORT_QUERY, sortQueryHandler } from '@/decorator/sortQuery.decorator'

@Singleton()
export class RegisterDecoratorService {
  @Inject()
  decoratorService: MidwayDecoratorService

  register() {
    // 从数据库获取最新用户信息
    this.decoratorService.registerMethodHandler(
      USERINFO_KEY,
      getUserInfoHandler,
    )
    // 获取app请求平台
    this.decoratorService.registerParameterHandler(
      APP_REQUEST_PLATFORM,
      getAppRequestPlatformHandler,
    )
    // 给入参复制默认排序字段
    this.decoratorService.registerMethodHandler(SORT_QUERY, sortQueryHandler)
  }
}
