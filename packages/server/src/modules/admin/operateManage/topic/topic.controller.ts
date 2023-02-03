import { Body, Controller, Get, Inject, Post, Query } from '@midwayjs/core'
import { BaseController } from '../../../../shared/controller/base.controller'
import { TopicService } from './topic.service'
import { ListDto } from '../../../../shared/dto/list.dto'
import { addTopicDto, updateTopicDto } from './dto/topic.dto'
import { ParseIntPipe } from '@midwayjs/validate'

@Controller('/admin/topic')
export class TopicController extends BaseController {
  @Inject()
  topicService: TopicService

  @Get('/getTopicPage', { summary: '获取话题列表' })
  async getTopicPage(@Query() params: ListDto) {
    return this.topicService.findMultiple(params)
  }

  @Get('/getTopicDetail', { summary: '获取话题详情' })
  async getTopicDetail(@Query('id', [ParseIntPipe]) id: number) {
    return this.topicService.findByPk(id)
  }

  @Post('/addTopic', { summary: '创建话题' })
  async addTopic(@Body() body: addTopicDto) {
    return this.topicService.create(body)
  }

  @Post('/updateTopic', { summary: '更新话题' })
  @Post('/blockTopic', { summary: '拉黑话题' })
  async updateTopic(@Body() body: updateTopicDto) {
    return this.topicService.update(body)
  }

  @Post('/deleteTopic', { summary: '删除话题' })
  async deleteTopic(@Body('id', [ParseIntPipe]) id: number) {
    return this.topicService.destroy(id)
  }

  @Post('/disbandTopic', { summary: '解散话题' })
  async disbandTopic(@Body('id', [ParseIntPipe]) id: number) {
    return this.topicService.destroy(id)
  }

  @Post('/concernTopic', { summary: '关注话题' })
  async concernTopic(@Body('id', [ParseIntPipe]) id: number) {
    return this.topicService.concernTopic(id)
  }
}
