import { OmitDto, PickDto, Rule } from "@midwayjs/validate";
import {
  givenValue,
  requiredNumber,
  requiredString, validateNumber,
  validateString
} from "../../../utils/validate/base.validate";

export class SocialCircleDto {
  @Rule(requiredNumber)
  id: number;

  @Rule(requiredNumber)
  classifyId: number;

  @Rule(validateString)
  classifyName?: string;

  @Rule(requiredString)
  name: string;

  @Rule(requiredString)
  icon: string;

  @Rule(validateString)
  cover?: string;

  @Rule(requiredString)
  desc?: string;

  @Rule(requiredString)
  memberTitle?: string;

  @Rule(validateNumber)
  vFollowers?: number;

  @Rule(requiredString)
  rule?: string;

  @Rule(givenValue([0, 1], false))
  guide?: number;

  @Rule(givenValue([0, 1, 2, 3], false))
  status?: number;
}

export class SocialCircleClassifyDto {
  @Rule(requiredNumber)
  id: number;

  @Rule(requiredString)
  classifyName: string;

  @Rule(validateNumber)
  sort?: number;
}

export class CreateSocialCircleClassifyDto extends PickDto(SocialCircleClassifyDto, ["classifyName", "sort"]) {
}

export class UpdateSocialCircleClassifyDto extends OmitDto(SocialCircleClassifyDto, ["sort"]) {
}

export class CreateSocialCircleDto extends OmitDto(SocialCircleDto, ["id"]) {
}

export class UpdateSocialCircleDto extends OmitDto(SocialCircleDto, ["status"]) {
}

export class UpdateSocialCircleStatus extends PickDto(SocialCircleDto, ["id", "status"]) {
}
