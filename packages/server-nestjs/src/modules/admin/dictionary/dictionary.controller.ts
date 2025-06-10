import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { IdDto, IdsDto } from '@/common/dto/id.dto'
import { IdsEnabledDto } from '@/common/dto/status.dto'
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

  @Get('page')
  @ApiPageDoc({
    summary: '分页查询字典',
    model: DictionaryDto,
  })
  getPage(@Query() query: QueryDictionaryDto) {
    return this.dictionaryService.findDictionaries(query)
  }

  @Get('detail')
  @ApiDoc({
    summary: '获取字典详情',
    model: DictionaryDto,
  })
  getDetail(@Query() query: IdDto) {
    return this.dictionaryService.findById(query)
  }

  @Post('create')
  @ApiDoc({
    summary: '创建字典',
    model: DictionaryDto,
  })
  create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create({
      data: createDictionaryDto,
      omit: { remark: true },
    })
  }

  @Post('update')
  @ApiDoc({
    summary: '更新字典',
    model: DictionaryDto,
  })
  update(@Body() updateDictionaryDto: DictionaryDto) {
    return this.dictionaryService.update({
      where: { id: updateDictionaryDto.id },
      data: updateDictionaryDto,
      omit: { remark: true },
    })
  }

  @Post('delete')
  @ApiDoc({
    summary: '删除字典',
    model: IdsDto,
  })
  delete(@Body() query: IdsDto) {
    return this.dictionaryService.deleteMany({ id: { in: query.ids } })
  }

  @Post('updateEnableStatus')
  @ApiDoc({
    summary: '启用禁用字典',
    model: DictionaryDto,
  })
  enable(@Body() query: IdsEnabledDto) {
    return this.dictionaryService.updateMany({
      where: { id: { in: query.ids } },
      data: { isEnabled: query.enabled },
    })
  }

  @Get('items')
  @ApiDoc({
    summary: '获取字典项',
    model: DictionaryItemDto,
  })
  getItems(@Query() query: QueryDictionaryItemDto) {
    return this.dictionaryService.findDictionaryItems(query)
  }

  @Post('createItem')
  @ApiDoc({
    summary: '创建字典项',
    model: DictionaryItemDto,
  })
  createItem(@Body() createDictionaryItemDto: CreateDictionaryItemDto) {
    return this.dictionaryService.createDictionaryItem(createDictionaryItemDto)
  }

  @Post('updateItem')
  @ApiDoc({
    summary: '更新字典项',
    model: DictionaryItemDto,
  })
  updateItem(@Body() updateDictionaryItemDto: UpdateDictionaryItemDto) {
    return this.dictionaryService.update({
      where: { id: updateDictionaryItemDto.id },
      data: updateDictionaryItemDto,
    })
  }

  @Post('deleteItem')
  @ApiDoc({
    summary: '删除字典项',
    model: DictionaryItemDto,
  })
  deleteItem(@Body() query: IdsDto) {
    return this.dictionaryService.deleteDictionaryItem(query.ids)
  }

  @Post('updateItemStatus')
  @ApiDoc({
    summary: '启用字典项',
    model: DictionaryItemDto,
  })
  enableItem(@Body() query: IdsEnabledDto) {
    return this.dictionaryService.updateDictionaryItem(query)
  }
}
