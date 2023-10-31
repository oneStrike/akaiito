import { Autoload, Provide, Init, Inject } from '@midwayjs/core'
import { ConfigService } from '../modules/internal/config/config.service'

@Autoload()
@Provide()
export class AutoLoadCore {
  @Inject()
  configServer: ConfigService

  @Init()
  async init() {
    //初始化项目配置
    await this.configServer.loadConfig()
  }
}
