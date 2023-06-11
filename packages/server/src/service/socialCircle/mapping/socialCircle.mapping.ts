import { BaseMapping } from "../../../shared/mapping/base.mapping";
import { Repository } from "sequelize-typescript";
import { SocialCircleEntity } from "../entities/socialCircle.entity";
import { InjectRepository } from "@midwayjs/sequelize";
import { Provide } from "@midwayjs/core";

@Provide()
export class SocialCircleMapping extends BaseMapping {
  @InjectRepository(SocialCircleEntity)
  protected repository: Repository<SocialCircleEntity>;

}
