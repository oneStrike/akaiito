import { BaseController } from "../../shared/controller/base.controller";
import { Body, Controller, Get, Inject, Post, Query } from "@midwayjs/core";
import { SocialCircleService } from "../../service/socialCircle/socialCircle.service";
import {
  CreateSocialCircleClassifyDto,
  CreateSocialCircleDto, getSocialCirclePageDto, UpdateSocialCircleClassifyDto,
  UpdateSocialCircleDto, UpdateSocialCircleGuideStatusDto,
  UpdateSocialCircleStatusDto
} from "../../service/socialCircle/dto/socialCircle.dto";
import { IdDto } from "../../shared/dto/base.dto";


@Controller("/admin/socialCircle")
export class SocialCircleController extends BaseController {
  @Inject()
  socialCircleService: SocialCircleService;

  @Post("/createSocialCircleClassify", { summary: "创建圈子分类" })
  async createSocialCircleClassify(@Body() body: CreateSocialCircleClassifyDto) {
    return await this.socialCircleService.createSocialCircleClassify(body);
  }

  @Post("/updateSocialCircleClassify", { summary: "更新圈子分类" })
  async updateSocialCircleClassify(@Body() body: UpdateSocialCircleClassifyDto) {
    return await this.socialCircleService.classifyMapping.updateOne(body, { id: body.id });
  }

  @Post("/deleteSocialCircleClassify", { summary: "删除圈子分类" })
  async deleteSocialCircleClassify(@Body() body: IdDto) {
    return await this.socialCircleService.classifyMapping.destroy({ id: body.id });
  }

  @Post("/createSocialCircle", { summary: "创建圈子" })
  async createSocialCircle(@Body() body: CreateSocialCircleDto) {
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

  @Post("/updateSocialCircleStatus", { summary: "更新圈子状态" })
  async UpdateSocialCircleStatus(@Body() body: UpdateSocialCircleStatusDto) {
    if (body.status === 1) body.bannedReason = null;
    return await this.socialCircleService.update({
      status: body.status
    }, body.id);
  }

  @Post("/updateSocialCircleGuideStatus", { summary: "更新圈子首页展示状态状态" })
  async updateSocialCircleGuideStatus(@Body() body: UpdateSocialCircleGuideStatusDto) {
    return await this.socialCircleService.update({
      guide: body.guide
    }, body.id);
  }

  @Get("/getSocialCirclePage", { summary: "获取圈子分页列表" })
  async getSocialCirclePage(@Query() query: getSocialCirclePageDto) {
    return await this.socialCircleService.getSocialCirclePage(query);
  }


  @Get("/getSocialCircleDetail", { summary: "获取圈子详情" })
  async getSocialCircleDetail(@Query() { id }: IdDto) {
    return await this.socialCircleService.findByPk(id);
  }

  @Get("/getSocialCircleClassifyList", { summary: "获取圈子分类列表" })
  async getSocialCircleClassifyList() {
    return await this.socialCircleService.classifyMapping.findAll();
  }
}
