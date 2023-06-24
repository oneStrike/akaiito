import { BaseController } from "../../shared/controller/base.controller";
import { Body, Controller, Get, Inject, Post, Query } from "@midwayjs/core";
import { SocialCircleService } from "../../service/socialCircle/socialCircle.service";
import {
  CreateClientSocialCircleDto,
  getSocialCirclePageDto,
  UpdateSocialCircleDto
} from "../../service/socialCircle/dto/socialCircle.dto";
import { IdDto } from "../../shared/dto/base.dto";


@Controller("/client/socialCircle")
export class SocialCircleController extends BaseController {
  @Inject()
  socialCircleService: SocialCircleService;

  @Get("/getSocialCirclePage", { summary: "获取圈子分页列表" })
  async getSocialCirclePageDto(@Query() query: getSocialCirclePageDto) {
    return await this.socialCircleService.getSocialCirclePage(query, true);
  }

  @Get("/getSocialCircleDetail", { summary: "获取圈子详情" })
  async getSocialCircleDetail(@Query() { id }: IdDto) {
    return await this.socialCircleService.findByPk(id);
  }

  @Get("/getSocialCircleClassifyList", { summary: "获取圈子分类列表" })
  async getSocialCircleClassifyList() {
    return await this.socialCircleService.classifyMapping.findAll();
  }

  @Post("/createSocialCircle", { summary: "创建圈子" })
  async createSocialCircle(@Body() body: CreateClientSocialCircleDto) {
    body.status = 1;
    return await this.socialCircleService.createSocialCircle(body);
  }

  @Post("/updateSocialCircle", { summary: "更新圈子" })
  async uploadSocialCircle(@Body() body: UpdateSocialCircleDto) {
    return await this.socialCircleService.update(body, body.id);
  }

  @Post("/deleteSocialCircle", { summary: "删除圈子" })
  async deleteSocialCircle(@Body() body: IdDto) {
    return await this.socialCircleService.destroy(body.id);
  }
}
