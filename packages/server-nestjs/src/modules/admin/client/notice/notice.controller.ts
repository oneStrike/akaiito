import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc, ApiPageDoc } from '@/common/decorators/api-doc.decorator'
import { IdDto, IdsDto } from '@/common/dto/id.dto'
import {
  BaseNoticeDto,
  CreateNoticeDto,
  NoticePageResponseDto,
  QueryNoticeDto,
  UpdateNoticeDto,
  UpdateNoticeStatusDto,
} from './dto/notice.dto'
import { ClientNoticeService } from './notice.service'

/**
 * 客户端通知控制器
 * 提供通知相关的API接口
 */
@ApiTags('客户端通知模块')
@Controller('admin/notice')
export class ClientNoticeController {
  constructor(private readonly noticeService: ClientNoticeService) {}

  /**
   * 创建通知
   */
  @Post('/create')
  @ApiDoc({
    summary: '创建通知消息',
    model: IdDto,
  })
  async create(@Body() body: CreateNoticeDto) {
    return this.noticeService.createNotice(body)
  }

  /**
   * 分页查询通知列表
   */
  @Get('/page')
  @ApiPageDoc({
    summary: '分页查询通知列表',
    model: NoticePageResponseDto,
  })
  async getPage(@Query() query: QueryNoticeDto) {
    return this.noticeService.findNoticePage(query)
  }

  /**
   * 根据ID查询通知详情
   */
  @Get('detail')
  @ApiDoc({
    summary: '根据ID查询通知详情',
    model: BaseNoticeDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.noticeService.findDetail(id)
  }

  /**
   * 更新通知
   */
  @Post('update')
  @ApiDoc({
    summary: '更新通知消息',
    model: IdDto,
  })
  async update(@Body() body: UpdateNoticeDto) {
    const { id, ...data } = body
    return this.noticeService.updateById({ id, data })
  }

  /**
   * 更新通知状态
   */
  @Post('updateStatus')
  @ApiDoc({
    summary: '更新通知状态',
    model: IdsDto,
  })
  async updateStatus(@Body() body: UpdateNoticeStatusDto) {
    return this.noticeService.updateMany({
      where: { id: { in: body.ids } },
      data: { status: body.status },
    })
  }

  /**
   * 批量删除通知
   */
  @Post('batchDelete')
  @ApiDoc({
    summary: '批量删除通知',
    model: IdsDto,
  })
  async batchRemove(@Body() body: IdsDto) {
    return this.noticeService.softDeleteMany({ id: { in: body.ids } })
  }
}
