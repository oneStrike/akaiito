import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import {
  CreateFunPluginDto,
  FunPluginDto,
  GetFunPluginDto
} from './dto/funPlugin.dto'
import { FunPluginService } from './funPlugin.service'
import { BasicIdStatusDto, BasicIdDto } from '@/basic/dto/basic.dto'

@Controller('/admin/funPlugin')
export class FunPluginController {
  @Inject()
  funPluginService: FunPluginService

  @Get('/getFunPlugin', { summary: '获取功能插件列表' })
  async getFunPlugin(@Query() query: GetFunPluginDto) {
    return this.funPluginService.findList({
      ...query,
      fuzzy: ['name']
    })
  }

  @Post('/createFunPlugin', { summary: '创建功能插件' })
  async createFunPlugin(@Body() body: CreateFunPluginDto) {
    return this.funPluginService.create(body)
  }

  @Post('/updateFunPlugin', { summary: '更新功能插件' })
  async updateFunPlugin(@Body() body: FunPluginDto) {
    return this.funPluginService.update({ id: body.id }, body)
  }

  @Post('/deleteFunPlugin', { summary: '删除功能插件' })
  async deleteFunPlugin(@Body() body: BasicIdDto) {
    return this.funPluginService.delete(body)
  }

  @Post('/updateFunPluginStatus', { summary: '更新功能插件状态' })
  async updateFunPluginStatus(@Body() body: BasicIdStatusDto) {
    return this.funPluginService.update({ id: body.id }, body)
  }
}
