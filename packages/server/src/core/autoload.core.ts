import {
  Autoload,
  Provide,
  Init,
  Inject,
  MidwayDecoratorService
} from '@midwayjs/core'
import {
  SERIALIZE_KEY,
  SerializeHandle
} from '../decorator/serialize.decorator'
import { ConfigCore } from './config.core'
import { PageService } from '../modules/admin/clientManage/page/page.service'

@Autoload()
@Provide()
export class AutoLoadCore {
  @Inject()
  midwayDecoratorService: MidwayDecoratorService

  @Inject()
  configCore: ConfigCore

  @Inject()
  pageService: PageService

  @Init()
  async init() {
    //加载自定义方法装饰器
    this.midwayDecoratorService.registerMethodHandler(
      SERIALIZE_KEY,
      SerializeHandle
    )

    //初始化项目配置
    await this.configCore.initConfig()

    //插入客户端页面数据
    await this.pageService.createClientPage()
  }
}
