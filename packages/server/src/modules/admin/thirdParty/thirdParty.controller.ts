import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { ThirdPartyQueryDTO, ThirdPartyParseDTO } from '@/modules/admin/thirdParty/dto/thirdParty.dto'
import { ThirdPartyResourceService } from '@/service/admin/thirdPartyResource/thirdParty.service'

@Controller('/admin/thirdParty')
export class ThirdPartyController {
  @Inject()
  thirdPartyService: ThirdPartyResourceService

  @Get('/service')
  async service() {
    return [{ name: '拷贝', code: 'copy' }]
  }

  @Get('/searchWord')
  async searchWord(@Query() params: ThirdPartyQueryDTO) {
    return await this.thirdPartyService.searchWord(params)
  }

  @Post('/parseWord')
  async parseWord(@Body() body: ThirdPartyParseDTO) {
    return await this.thirdPartyService.parseWord(body)
  }
}
