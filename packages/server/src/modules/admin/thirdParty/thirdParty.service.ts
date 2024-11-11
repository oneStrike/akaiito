import { Inject, Provide } from '@midwayjs/core'
import { CopyMangaService } from '@/modules/admin/thirdParty/libs/copy.service'
import { ThirdPartyQueryDto, ThirdPartyParseDto } from '@/modules/admin/thirdParty/dto/thirdParty.dto'
import { Comic, PrismaClient } from '@prisma/client'
import { BasicService } from '@/basic/service/basic.service'

@Provide()
export class ThirdPartyService extends BasicService<Comic> {
  @Inject()
  prismaClient: PrismaClient

  protected get model() {
    return this.prismaClient.comic
  }

  @Inject()
  copy: CopyMangaService

  async searchWord(params: ThirdPartyQueryDto) {
    const data = await this[params.service].searchWord(params.keyword)
    if (data.code !== 200) {
      this.throwError('解析服务错误')
    }
    return data.data
  }

  async parseWord(body: ThirdPartyParseDto) {
    const data = await this[body.service].parseWord(body.id)
    if (data.code !== 200) {
      this.throwError('解析服务错误')
    }
    return data.data
  }
}
