import { BasicIdsDTO, BasicIdsStatusDTO, BasicOrderDTO } from '@/basic/dto/basic.dto'
import { DictionaryService } from '@/service/dataDictionary/dictionary.service'
import { DictionaryServiceItems } from '@/service/dataDictionary/dictionary-items.service'
import {
  CreateDictionaryDTO,
  CreateDictionaryItemsDTO,
  FindDictionDTO,
  FindDictionItemsDTO,
  UpdateDictionaryDTO,
} from './dto/dictionary.dto'
import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'

@Controller('/admin/dictionary')
export class DictionaryController {
  @Inject()
  dictionaryService: DictionaryService

  @Inject()
  dictionaryItemsService: DictionaryServiceItems

  @Get('/getDataDictionary', { summary: '获取数据字典列表' })
  async getDataDictionary(@Query() query: FindDictionDTO) {
    return this.dictionaryService.findPage({
      where: query,
      like: {
        name: 'contains',
        code: 'contains',
      },
    })
  }

  @Get('/getDataDictionaryItems', { summary: '获取数据字典子项列表' })
  async getDataDictionaryItems(@Query() query: FindDictionItemsDTO) {
    return this.dictionaryItemsService.getItems({
      where: query,
      like: {
        name: 'contains',
        code: 'contains',
      },
    })
  }

  @Post('/createDataDictionary', { summary: '创建数据字典' })
  async createDataDictionary(@Body() body: CreateDictionaryDTO) {
    return this.dictionaryService.create({ data: body })
  }

  @Post('/createDataDictionaryItems', { summary: '创建数据字典子项' })
  async createDataDictionaryItems(@Body() body: CreateDictionaryItemsDTO) {
    return this.dictionaryItemsService.createItems(body)
  }

  @Post('/deleteDataDictionary', { summary: '删除数据字典' })
  async deleteDataDictionary(@Body() body: BasicIdsDTO) {
    return this.dictionaryService.deleteBatch({
      where: { id: { in: body.ids } },
    })
  }

  @Post('/deleteDataDictionaryItems', { summary: '删除数据字典子项' })
  async deleteDataDictionaryItems(@Body() body: BasicIdsDTO) {
    return this.dictionaryItemsService.deleteBatch({
      where: { id: { in: body.ids } },
    })
  }

  @Post('/updateDataDictionary', { summary: '更新数据字典' })
  async updateDataDictionary(@Body() body: UpdateDictionaryDTO) {
    return this.dictionaryService.update({ where: { id: body.id }, data: body })
  }

  @Post('/updateDataDictionaryItems', { summary: '更新数据字典子项' })
  async updateDataDictionaryItems(@Body() body: UpdateDictionaryDTO) {
    return this.dictionaryItemsService.update({
      where: { id: body.id },
      data: body,
    })
  }

  @Post('/updateDataDictionaryStatus', { summary: '更新数据字典状态' })
  async updateDataDictionaryStatus(@Body() body: BasicIdsStatusDTO) {
    return this.dictionaryService.updateBatch({
      where: { id: { in: body.ids } },
      data: { status: body.status },
    })
  }

  @Post('/updateDataDictionaryItemsStatus', { summary: '更新数据字典子项状态' })
  async updateDataDictionaryItemsStatus(@Body() body: BasicIdsStatusDTO) {
    return this.dictionaryItemsService.updateBatch({
      where: { id: { in: body.ids } },
      data: { status: body.status },
    })
  }

  @Post('/updateDataDictionaryItemsOrder', { summary: '更新数据字典子项排序' })
  async updateDataDictionaryItemsOrder(@Body() body: BasicOrderDTO) {
    return this.dictionaryItemsService.updateOrder(body)
  }
}
