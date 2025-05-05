import { Inject, Provide } from '@midwayjs/core'
import { CopyMangaService } from '@/service/thirdParty/libs/copy.service'
import { ThirdPartyQueryDTO, ThirdPartyParseDTO } from '@/modules/admin/thirdParty/dto/thirdParty.dto'
import { WorkComic, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'

@Provide()
export class ThirdPartyService extends BasicService<WorkComic> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.workComic
  }

  @Inject()
  copy: CopyMangaService

  async searchWord(params: ThirdPartyQueryDTO) {
    const data = await this[params.service].searchWord(params.keyword)
    if (data.code !== 200) {
      this.throwError('解析服务错误')
    }
    return data.data
  }

  async parseWord(body: ThirdPartyParseDTO) {
    const data = await this[body.service].parseWord(body.id)
    if (data.code !== 200) {
      this.throwError('解析服务错误')
    }
    return data.data
  }
}
