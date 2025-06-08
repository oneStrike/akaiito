import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { useClassSerializerInterceptor } from '@/common/serializers/class-transformer.serializer'
import { DictionaryService } from './dictionary.service'
import { CreateDictionaryDto } from './dto/create-dictionary.dto'
import {
  CreateDictionaryItemDto,
  UpdateDictionaryItemDto,
} from './dto/dictionary-item.dto'
import { DictionaryDto, DictionaryItemDto } from './dto/dictionary.dto'
import {
  QueryDictionaryDto,
  QueryDictionaryItemDto,
} from './dto/query-dictionary.dto'
import { UpdateDictionaryDto } from './dto/update-dictionary.dto'

/**
 * 数据字典控制器
 * 提供字典和字典项的 RESTful API 接口
 */
@ApiTags('数据字典模块')
@Controller('shared/dictionary')
@UseInterceptors(useClassSerializerInterceptor(DictionaryDto))
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  /**
   * 创建数据字典
   * @param createDictionaryDto 创建字典数据
   * @returns 创建的字典信息
   */
  @Post('/create')
  @ApiDoc({
    summary: '创建数据字典',
    model: DictionaryDto,
  })
  async createDictionary(@Body() createDictionaryDto: CreateDictionaryDto) {
    return await this.dictionaryService.createDictionary(createDictionaryDto)
  }

  /**
   * 分页查询数据字典列表
   * @param queryDto 查询条件
   * @returns 分页数据
   */
  @Get('/getPage')
  @ApiPageDoc({
    summary: '分页查询数据字典列表',
    model: DictionaryDto,
  })
  async findDictionaries(@Query() queryDto: QueryDictionaryDto) {
    return await this.dictionaryService.findDictionaries(queryDto)
  }

  /**
   * 根据ID获取字典详情
   * @query query ID参数
   * @returns 字典详情
   */
  @Get('/getDetailById')
  @ApiDoc({
    summary: '根据ID获取字典详情',
    model: DictionaryDto,
  })
  async findDictionaryById(@Query() query: IdDto) {
    return await this.dictionaryService.findDictionaryById(query.id)
  }

  /**
   * 更新数据字典
   * @param updateDictionaryDto 更新数据
   * @returns 更新后的字典信息
   */
  @Post('/update')
  @ApiDoc({
    summary: '更新数据字典',
    model: DictionaryDto,
  })
  async updateDictionary(@Body() updateDictionaryDto: UpdateDictionaryDto) {
    return await this.dictionaryService.updateDictionary(updateDictionaryDto)
  }

  /**
   * 删除数据字典
   * @param params ID参数
   * @returns 删除结果
   */
  @Delete(':id')
  @ApiDoc({
    summary: '删除数据字典',
  })
  async deleteDictionary(@Param() params: IdDto) {
    return await this.dictionaryService.deleteDictionary(params.id)
  }

  /**
   * 创建字典项
   * @param createDictionaryItemDto 创建字典项数据
   * @returns 创建的字典项信息
   */
  @Post('item')
  @ApiDoc({
    summary: '创建字典项',
    model: DictionaryItemDto,
  })
  @UseInterceptors(useClassSerializerInterceptor(DictionaryItemDto))
  async createDictionaryItem(
    @Body() createDictionaryItemDto: CreateDictionaryItemDto,
  ) {
    return await this.dictionaryService.createDictionaryItem(
      createDictionaryItemDto,
    )
  }

  /**
   * 分页查询字典项列表
   * @param queryDto 查询条件
   * @returns 分页数据
   */
  @Get('item/list')
  @ApiPageDoc({
    summary: '分页查询字典项列表',
    model: DictionaryItemDto,
  })
  @UseInterceptors(useClassSerializerInterceptor(DictionaryItemDto))
  async findDictionaryItems(@Query() queryDto: QueryDictionaryItemDto) {
    return await this.dictionaryService.findDictionaryItems(queryDto)
  }

  /**
   * 根据ID获取字典项详情
   * @param params ID参数
   * @returns 字典项详情
   */
  @Get('item/:id')
  @ApiDoc({
    summary: '根据ID获取字典项详情',
    model: DictionaryItemDto,
  })
  @UseInterceptors(useClassSerializerInterceptor(DictionaryItemDto))
  async findDictionaryItemById(@Param() params: IdDto) {
    return await this.dictionaryService.findDictionaryItemById(params.id)
  }

  /**
   * 更新字典项
   * @param params ID参数
   * @param updateDictionaryItemDto 更新数据
   * @returns 更新后的字典项信息
   */
  @Put('item/:id')
  @ApiDoc({
    summary: '更新字典项',
    model: DictionaryItemDto,
  })
  @UseInterceptors(useClassSerializerInterceptor(DictionaryItemDto))
  async updateDictionaryItem(
    @Param() params: IdDto,
    @Body() updateDictionaryItemDto: UpdateDictionaryItemDto,
  ) {
    return await this.dictionaryService.updateDictionaryItem(
      params.id,
      updateDictionaryItemDto,
    )
  }

  /**
   * 删除字典项
   * @param params ID参数
   * @returns 删除结果
   */
  @Delete('item/:id')
  @ApiDoc({
    summary: '删除字典项',
  })
  async deleteDictionaryItem(@Param() params: IdDto) {
    return await this.dictionaryService.deleteDictionaryItem(params.id)
  }
}
