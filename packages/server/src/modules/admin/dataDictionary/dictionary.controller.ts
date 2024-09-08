import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import type { BasicIdsDto, BasicIdsStatusDto, BasicOrderDto } from '@/basic/dto/basic.dto'
import { DictionaryService } from './dictionary.service'
import { DictionaryServiceItems } from './dictionary-items.service'
import type {
  CreateDictionaryDto,
  CreateDictionaryItemsDto,
  FindDictionDto,
  FindDictionItemsDto,
  UpdateDictionaryDto,
} from './dto/dictionary.dto'

@Controller('/admin/dictionary')
export class DictionaryController {
  @Inject()
  dictionaryService: DictionaryService

  @Inject()
  dictionaryItemsService: DictionaryServiceItems

  @Get('/getDataDictionary', { summary: '获取数据字典列表' })
  async getDataDictionary(@Query() query: FindDictionDto) {
    return this.dictionaryService.findPage({
      ...query,
      fuzzy: ['name', 'code'],
    })
  }

  @Get('/getDataDictionaryItems', { summary: '获取数据字典子项列表' })
  async getDataDictionaryItems(@Query() query: FindDictionItemsDto) {
    return this.dictionaryItemsService.getItems({
      ...query,
      fuzzy: ['name', 'code'],
    })
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
  async deleteDataDictionary(@Body() body: BasicIdsDto) {
    return this.dictionaryService.deleteBatch({ id: { in: body.ids } })
  }

  @Post('/deleteDataDictionaryItems', { summary: '删除数据字典子项' })
  async deleteDataDictionaryItems(@Body() body: BasicIdsDto) {
    return this.dictionaryItemsService.deleteBatch({ id: { in: body.ids } })
  }

  @Post('/updateDataDictionary', { summary: '更新数据字典' })
  async updateDataDictionary(@Body() body: UpdateDictionaryDto) {
    return this.dictionaryService.update({ id: body.id }, body)
  }

  @Post('/updateDataDictionaryItems', { summary: '更新数据字典子项' })
  async updateDataDictionaryItems(@Body() body: UpdateDictionaryDto) {
    return this.dictionaryItemsService.update({ id: body.id }, body)
  }

  @Post('/updateDataDictionaryStatus', { summary: '更新数据字典状态' })
  async updateDataDictionaryStatus(@Body() body: BasicIdsStatusDto) {
    return this.dictionaryService.updateBatch(
      { id: { in: body.ids } },
      { status: body.status },
    )
  }

  @Post('/updateDataDictionaryItemsStatus', { summary: '更新数据字典子项状态' })
  async updateDataDictionaryItemsStatus(@Body() body: BasicIdsStatusDto) {
    return this.dictionaryItemsService.updateBatch(
      { id: { in: body.ids } },
      { status: body.status },
    )
  }

  @Post('/updateDataDictionaryItemsOrder', { summary: '更新数据字典子项排序' })
  async updateDataDictionaryItemsOrder(@Body() body: BasicOrderDto) {
    return this.dictionaryItemsService.updateOrder(body)
  }
}
