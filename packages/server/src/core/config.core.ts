import { Inject, Provide, MidwayConfigService } from '@midwayjs/core'
import { ConfigService } from '../service/config.service'
import { ConfigEnum } from '../shared/enum/config.enum'
import { BaseMapping } from '../shared/mapping/base.mapping'
import { BaseService } from '../shared/service/base.service'
import { join } from 'path'

@Provide()
export class ConfigCore extends BaseService {
  protected mapping: BaseMapping

  @Inject()
  midwayConfigService: MidwayConfigService

  @Inject()
  configService: ConfigService

  async initConfig() {
    Promise.all([
      this.configService.getConfig(ConfigEnum.JWT),
      this.configService.getConfig(ConfigEnum.STATIC),
      this.configService.getConfig(ConfigEnum.UPLOAD),
      this.configService.getConfig(ConfigEnum.WHITELIST)
    ]).then(
      async ([jwt, staticCache, { upload }, whitelist]: Record<
        string,
        any
      >[]) => {
        upload.tmpdir = join(__dirname, '../../') + upload.tmpdir
        await this.utils.fs.ensureDir(upload.tmpdir)
        this.midwayConfigService.addObject(jwt)
        this.midwayConfigService.addObject({ static: staticCache })
        this.midwayConfigService.addObject({ upload })
        this.midwayConfigService.addObject(whitelist)
      }
    )
  }
}
