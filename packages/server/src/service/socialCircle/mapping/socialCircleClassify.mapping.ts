import { BaseMapping } from "../../../shared/mapping/base.mapping";
import { Repository } from "sequelize-typescript";
import { SocialCircleClassifyEntity } from "../entities/socialCircle.entity";
import { InjectRepository } from "@midwayjs/sequelize";
import { Provide } from "@midwayjs/core";

@Provide()
export class SocialCircleClassifyMapping extends BaseMapping {
  @InjectRepository(SocialCircleClassifyEntity)
  protected repository: Repository<SocialCircleClassifyEntity>;

}
