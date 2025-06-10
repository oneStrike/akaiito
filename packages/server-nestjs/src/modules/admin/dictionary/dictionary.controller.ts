import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { DictionaryService } from '@/modules/shared/dictionary/dictionary.service'
import { CreateDictionaryDto } from '@/modules/shared/dictionary/dto/create-dictionary.dto'
import { DictionaryDto } from '@/modules/shared/dictionary/dto/dictionary.dto'
import { QueryDictionaryDto } from '@/modules/shared/dictionary/dto/query-dictionary.dto'

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
    model: DictionaryDto,
  })
  delete(@Body() query: IdDto) {
    return this.dictionaryService.delete({
      where: { id: query.id },
    })
  }
}
