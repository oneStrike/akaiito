import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { BaseController } from '../../../shared/controller/base.controller'
import { PrivacyService } from '../../../service/privacy/privacy.service'
import {
  AddPrivacyDto,
  GetPrivacyDto
} from '../../../service/privacy/dto/privacy.dto'
import { IdDto, IdsDto, ToggleStatusDto } from '../../../shared/dto/base.dto'

@Controller('/admin/privacy')
export class PrivacyController extends BaseController {
  @Inject()
  privacyService: PrivacyService

  @Get('/getPrivacyPage', { summary: '获取隐私申明列表' })
  async getPrivacyPage(@Query() params: GetPrivacyDto) {
    return this.privacyService.getPrivacyList(params)
  }

  @Get('/getPrivacyDetail', { summary: '获取隐私声明详情' })
  async getPrivacyDetail(@Query() query: IdDto) {
    return this.privacyService.findByPk(query.id)
  }

  @Post('/addPrivacy', { summary: '添加隐私声明' })
  async addPrivacy(@Body() body: AddPrivacyDto) {
    return this.privacyService.create(body)
  }

  @Post('/switchPrivacyStatus', { summary: '启用或禁用隐私声明' })
  async toggleState(@Body() body: ToggleStatusDto) {
    return this.privacyService.update(body, body.ids)
  }

  @Post('/deletePrivacy', { summary: '删除隐私声明' })
  async deletePrivacy(@Body() body: IdsDto) {
    return this.privacyService.destroy(body.ids)
  }
  @Post('/updatePrivacy', { summary: '更新隐私声明' })
  async updatePrivacy(@Body() body: IdDto & AddPrivacyDto) {
    return this.privacyService.update(body, body.id)
  }
}
