import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { DictionaryService } from './dictionary.service'
import {
  CreateDictionaryDto,
  CreateDictionaryItemsDto,
  FindDictionDto,
  FindDictionItemsDto,
  UpdateDictionaryDto
} from './dto/dictionary.dto'
import { DictionaryServiceItems } from './dictionary-items.service'
import {
  BaseIdDto,
  BaseOrderDto,
  BaseStatusDto
} from '../../../base/dto/base.dto'

@Controller('/admin/dictionary')
export class DictionaryController {
  @Inject()
  dictionaryService: DictionaryService

  @Inject()
  dictionaryItemsService: DictionaryServiceItems

  @Get('/getDataDictionary', { summary: '获取数据字典列表' })
  async getDataDictionary(@Query() query: FindDictionDto) {
    return this.dictionaryService.findPage(query)
  }

  @Get('/getDataDictionaryItems', { summary: '获取数据字典子项列表' })
  async getDataDictionaryItems(@Query() query: FindDictionItemsDto) {
    return this.dictionaryItemsService.getItems(query)
  }

  @Post('/createDataDictionary', { summary: '创建数据字典' })
  async createDataDictionary(@Body() body: CreateDictionaryDto) {
    return this.dictionaryService.create(body)
  }

  @Post('/createDataDictionaryItems', { summary: '创建数据字典子项' })
  async createDataDictionaryItems(@Body() body: CreateDictionaryItemsDto) {
    return this.dictionaryItemsService.createItems(body)
  }

  @Post('/deleteDataDictionary', { summary: '删除数据字典' })
  async deleteDataDictionary(@Body() body: BaseIdDto) {
    return this.dictionaryService.delete(body)
  }

  @Post('/deleteDataDictionaryItems', { summary: '删除数据字典子项' })
  async deleteDataDictionaryItems(@Body() body: BaseIdDto) {
    return this.dictionaryItemsService.delete(body)
  }

  @Post('/updateDataDictionary', { summary: '更新数据字典' })
  async updateDataDictionary(@Body() body: UpdateDictionaryDto) {
    return this.dictionaryService.updateById(body.id, body)
  }

  @Post('/updateDataDictionaryItems', { summary: '更新数据字典子项' })
  async updateDataDictionaryItems(@Body() body: UpdateDictionaryDto) {
    return this.dictionaryItemsService.updateById(body.id, body)
  }

  @Post('/updateDataDictionaryStatus', { summary: '更新数据字典状态' })
  async updateDataDictionaryStatus(@Body() body: BaseStatusDto) {
    return this.dictionaryService.updateBatch({ id: { in: body.ids } }, body)
  }

  @Post('/updateDataDictionaryItemsStatus', { summary: '更新数据字典子项状态' })
  async updateDataDictionaryItemsStatus(@Body() body: BaseStatusDto) {
    return this.dictionaryItemsService.updateBatch(
      { id: { in: body.ids } },
      body
    )
  }

  @Post('/updateDataDictionaryItemsOrder', { summary: '更新数据字典子项排序' })
  async updateDataDictionaryItemsOrder(@Body() body: BaseOrderDto) {
    return this.dictionaryItemsService.updateOrder(body)
  }
}
