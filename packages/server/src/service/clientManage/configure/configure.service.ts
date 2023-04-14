import { BaseService } from '../../../shared/service/base.service'
import { Provide, Config } from '@midwayjs/core'
import { BaseMapping } from '../../../shared/mapping/base.mapping'
import { ClientConfigureDto } from './dto/configure.dto'

@Provide()
export class ConfigureService extends BaseService {
  protected mapping: BaseMapping

  @Config('static')
  staticService: Record<string | symbol, any>

  async uploadConfigure(configure: ClientConfigureDto) {
    console.log(this.staticService)
  }
}
