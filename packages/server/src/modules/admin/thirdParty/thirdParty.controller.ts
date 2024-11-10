import { Controller, Get, httpError, Inject, Query } from '@midwayjs/core'
import { ThirdPartyService } from '@/modules/admin/thirdParty/thirdParty.service'

@Controller('/admin/thirdParty')
export class ThirdPartyController {
  @Inject()
  thirdPartyService: ThirdPartyService

  @Get('/searchWord')
  async searchWord(@Query('keyword') keyword: string) {
    try {
      const { code, data } = await this.thirdPartyService.searchWord(keyword, 'copy')
      if (code !== 200) {
        throw new Error()
      }
      return data
    } catch (e) {
      throw new httpError.BadRequestError('解析服务错误')
    }
  }
}
