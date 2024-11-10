import { Inject, Provide } from '@midwayjs/core'
import { CopyMangaService } from '@/modules/admin/thirdParty/libs/copy.service'

@Provide()
export class ThirdPartyService {
  @Inject()
  copy: CopyMangaService

  async searchWord(keyword: string, service: 'copy') {
    return await this[service].searchWord(keyword)
  }

  async parseWord(keyword: string, service: 'copy') {
    return await this[service].parseWord(keyword)
  }
}
