import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { BatchOperationStatusIdsDto, CountDto } from '@/common/dto/batch.dto'
import { IdDto, IdsDto } from '@/common/dto/id.dto'
import { DictionaryService } from '@/modules/shared/dictionary/dictionary.service'
import { CreateDictionaryDto } from '@/modules/shared/dictionary/dto/create-dictionary.dto'
import {
  CreateDictionaryItemDto,
  UpdateDictionaryItemDto,
} from '@/modules/shared/dictionary/dto/dictionary-item.dto'
import {
  DictionaryDto,
  DictionaryItemDto,
} from '@/modules/shared/dictionary/dto/dictionary.dto'
import {
  QueryDictionaryDto,
  QueryDictionaryItemDto,
} from '@/modules/shared/dictionary/dto/query-dictionary.dto'

@ApiTags('字典管理')
@Controller('/admin/dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get('dictionary-page')
  @ApiPageDoc({
    summary: '分页查询字典',
    model: DictionaryDto,
  })
  getPage(@Query() query: QueryDictionaryDto) {
    return this.dictionaryService.findDictionaries(query)
  }

  @Get('dictionary-detail')
  @ApiDoc({
    summary: '获取字典详情',
    model: DictionaryDto,
  })
  getDetail(@Query() query: IdDto) {
    return this.dictionaryService.findById(query)
  }

  @Post('create-dictionary')
  @ApiDoc({
    summary: '创建字典',
    model: IdDto,
  })
  create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create({
      data: createDictionaryDto,
    })
  }

  @Post('update-dictionary')
  @ApiDoc({
    summary: '更新字典',
    model: IdDto,
  })
  update(@Body() updateDictionaryDto: DictionaryDto) {
    return this.dictionaryService.update({
      where: { id: updateDictionaryDto.id },
      data: updateDictionaryDto,
    })
  }

  @Post('delete-dictionary')
  @ApiDoc({
    summary: '删除字典',
    model: IdsDto,
  })
  delete(@Body() query: IdsDto) {
    return this.dictionaryService.deleteMany({ id: { in: query.ids } })
  }

  @Post('batch-update-dictionary-status')
  @ApiDoc({
    summary: '批量启用禁用字典',
    model: CountDto,
  })
  enable(@Body() query: BatchOperationStatusIdsDto) {
    return this.dictionaryService.updateMany({
      where: { id: { in: query.ids } },
      data: { isEnabled: query.isEnabled },
    })
  }

  @Get('dictionary-items')
  @ApiDoc({
    summary: '获取字典项',
    model: DictionaryItemDto,
    isArray: true,
  })
  getItems(@Query() query: QueryDictionaryItemDto) {
    return this.dictionaryService.findDictionaryItems(query)
  }

  @Post('create-dictionary-item')
  @ApiDoc({
    summary: '创建字典项',
    model: IdDto,
  })
  createItem(@Body() createDictionaryItemDto: CreateDictionaryItemDto) {
    return this.dictionaryService.createDictionaryItem(createDictionaryItemDto)
  }

  @Post('update-dictionary-item')
  @ApiDoc({
    summary: '更新字典项',
    model: IdDto,
  })
  updateItem(@Body() updateDictionaryItemDto: UpdateDictionaryItemDto) {
    return this.dictionaryService.updateDictionaryItem({
      ids: [updateDictionaryItemDto.id],
      ...updateDictionaryItemDto,
    })
  }

  @Post('delete-dictionary-item')
  @ApiDoc({
    summary: '删除字典项',
    model: CountDto,
  })
  deleteItem(@Body() query: IdsDto) {
    return this.dictionaryService.deleteDictionaryItem(query.ids)
  }

  @Post('update-dictionary-item-status')
  @ApiDoc({
    summary: '启用禁用字典项',
    model: CountDto,
  })
  enableItem(@Body() query: BatchOperationStatusIdsDto) {
    return this.dictionaryService.updateDictionaryItem(query)
  }
}
