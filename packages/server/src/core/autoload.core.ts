import { ConfigService } from '@/modules/internal/config/config.service'
import {
  Autoload,
  Config,
  Init,
  Inject,
  InjectClient,
  Provide,
} from '@midwayjs/core'
import * as fs from 'fs-extra'
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager'
import { JwtService } from '@/basic/service/jwt.service'

@Autoload()
@Provide()
export class AutoLoadCore {
  @Inject()
  configServer: ConfigService

  @Inject()
  jwt: JwtService

  @Config('projectConfig')
  projectConfig: { upload: { resourceScenario: any } }

  @Config('staticFile')
  staticFileConfig: { dirs: { default: { dir: string } } }

  @InjectClient(CachingFactory, 'default')
  cache: MidwayCache

  @Init()
  async init() {
    // 初始化项目配置
    await this.configServer.loadConfig()
    // 创建静态资源文件目录
    for (const item of this.projectConfig.upload.resourceScenario) {
      await fs.ensureDir(`${this.staticFileConfig.dirs.default.dir}/${item}`)
    }
    // 生成加密证书
    await this.jwt.generateKey()
  }
}
