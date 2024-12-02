import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { ThirdPartyService } from '@/service/thirdParty/thirdParty.service'
import { ThirdPartyQueryDTO, ThirdPartyParseDTO } from '@/modules/admin/thirdParty/dto/thirdParty.dto'

@Controller('/admin/thirdParty')
export class ThirdPartyController {
  @Inject()
  thirdPartyService: ThirdPartyService

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
