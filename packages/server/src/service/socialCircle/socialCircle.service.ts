import { BaseService } from "../../shared/service/base.service";
import { Inject, Provide } from "@midwayjs/core";
import { SocialCircleMapping } from "./mapping/socialCircle.mapping";
import { CreateSocialCircleClassifyDto, CreateSocialCircleDto } from "./dto/socialCircle.dto";
import { SocialCircleClassifyMapping } from "./mapping/socialCircleClassify.mapping";
import { SocialCircleClassifyEntity } from "./entities/socialCircle.entity";

@Provide()
export class SocialCircleService extends BaseService {
  @Inject()
  mapping: SocialCircleMapping;

  @Inject()
  classifyMapping: SocialCircleClassifyMapping;

  async createSocialCircle(params: CreateSocialCircleDto) {
    const data = await this.classifyMapping.findByPk(params.classifyId) as SocialCircleClassifyEntity;
    if (!data) {
      this.normalError("分类不存在");
      return;
    }

    try {
      params.classifyName = data.classifyName;
      if (typeof params.status === "undefined") params.status = 1;
      return (await this.mapping.create(params)).id;
    } catch (e) {
      console.log(e);
      return this.isUniqueError(e);
    }
  }

  async createSocialCircleClassify(params: CreateSocialCircleClassifyDto) {
    try {
      params.sort = (await this.getMaxSort("sort", this.classifyMapping)) + 1;
      return (await this.classifyMapping.create(params)).id;
    } catch (e) {
      console.log(e);
      return this.isUniqueError(e);
    }
  }
}
