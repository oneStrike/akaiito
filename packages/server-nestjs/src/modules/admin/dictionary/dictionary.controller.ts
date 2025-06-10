import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { DictionaryService } from '@/modules/shared/dictionary/dictionary.service'
import { CreateDictionaryDto } from '@/modules/shared/dictionary/dto/create-dictionary.dto'
import { DictionaryDto } from '@/modules/shared/dictionary/dto/dictionary.dto'
import { QueryDictionaryDto } from '@/modules/shared/dictionary/dto/query-dictionary.dto'

@ApiTags('字典管理')
@Controller('/admin/dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post('create')
  @ApiDoc({
    summary: '创建字典',
    model: DictionaryDto,
  })
  create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create(createDictionaryDto)
  }

  @Get('page')
  @ApiPageDoc({
    summary: '分页查询字典',
    model: DictionaryDto,
  })
  getPage(@Query() query: QueryDictionaryDto) {
    return this.dictionaryService.findDictionaries(query)
  }
}
