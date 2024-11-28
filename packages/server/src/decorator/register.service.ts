import { MidwayDecoratorService } from '@midwayjs/core'
import { getUserInfoHandler, USERINFO_KEY } from '@/decorator/userinfo.decorator'
import { Inject, Singleton } from '@midwayjs/core'
import { APP_REQUEST_PLATFORM, getAppRequestPlatformHandler } from '@/decorator/appRequestClient.decorator'

@Singleton()
export class RegisterService {
  @Inject()
  decoratorService: MidwayDecoratorService

  register() {
    // 从数据库获取最新用户信息
    this.decoratorService.registerMethodHandler(USERINFO_KEY, getUserInfoHandler)
    // 获取app请求平台
    this.decoratorService.registerParameterHandler(APP_REQUEST_PLATFORM, getAppRequestPlatformHandler)
  }
}
