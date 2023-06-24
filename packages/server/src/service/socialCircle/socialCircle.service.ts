import { BaseService } from "../../shared/service/base.service";
import { Inject, Provide } from "@midwayjs/core";
import { SocialCircleMapping } from "./mapping/socialCircle.mapping";
import { CreateSocialCircleClassifyDto, CreateSocialCircleDto, getSocialCirclePageDto } from "./dto/socialCircle.dto";
import { SocialCircleClassifyMapping } from "./mapping/socialCircleClassify.mapping";
import { SocialCircleClassifyEntity } from "./entities/socialCircle.entity";
import { FindMultipleServiceOptions } from "../../types/service/base";

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

  async getSocialCirclePage(params: getSocialCirclePageDto, isClient = false) {
    const nullKeys: FindMultipleServiceOptions["nullKeys"] = Number(params.orphan) ? { classifyId: "is" } : null;
    const likeKeys: FindMultipleServiceOptions["likeKeys"] = params.name ? { name: "include" } : null;
    delete params.orphan;
    const exclude = ["desc", "rule", "cover"];
    isClient && exclude.push("vFollowers");
    return this.findMultiple({
      params,
      likeKeys,
      nullKeys,
      attributes: { exclude }
    });

  }
}
