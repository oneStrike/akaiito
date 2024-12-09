import { ConfigService } from '@/basic/service/config.service'
import {
  Autoload,
  Config,
  Init,
  Inject,
  InjectClient,
  Provide,
} from '@midwayjs/core'
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager'
import { JwtService } from '@/auth/jwt.service'

@Autoload()
@Provide()
export class AutoLoadCore {
  @Inject()
  configServer: ConfigService

  @Inject()
  jwt: JwtService

  @Config('staticFile')
  staticFileConfig: { dirs: { default: { dir: string } } }

  @InjectClient(CachingFactory, 'default')
  cache: MidwayCache

  @Init()
  async init() {
    // 初始化项目配置
    await this.configServer.loadConfig()
    // 生成加密证书
    await this.jwt.generateKey()
  }
}
