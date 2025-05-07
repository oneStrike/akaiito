import { Inject, Provide } from '@midwayjs/core'
import { CopyMangaService } from './libs/copy.service'
import { ThirdPartyParseDTO, ThirdPartyQueryDTO } from '@/modules/admin/thirdParty/dto/thirdParty.dto'

@Provide()
export class ThirdPartyResourceService {


  @Inject()
  copy: CopyMangaService

  async searchWord(params: ThirdPartyQueryDTO) {
    return await this[params.service].searchWord(params.keyword)
  }

  async parseWord(body: ThirdPartyParseDTO) {
    return await this[body.service].parseWord(body.id)
  }
}
