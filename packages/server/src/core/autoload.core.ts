import { Autoload, Provide, Init, Inject, Config } from '@midwayjs/core'
import * as fs from 'fs-extra'
import { ConfigService } from '@/modules/internal/config/config.service'

@Autoload()
@Provide()
export class AutoLoadCore {
  @Inject()
  configServer: ConfigService

  @Config('projectConfig')
  projectConfig: { upload: { resourceScenario: any } }

  @Config('staticFile')
  staticFileConfig: { dirs: { default: { dir: string } } }

  @Init()
  async init() {
    //初始化项目配置
    await this.configServer.loadConfig()
    //创建静态资源文件目录
    for (const item of this.projectConfig.upload.resourceScenario) {
      await fs.ensureDir(this.staticFileConfig.dirs.default.dir + '/' + item)
    }
  }
}
