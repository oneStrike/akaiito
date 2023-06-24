import { OmitDto, PickDto, Rule } from "@midwayjs/validate";
import {
  givenValue,
  requiredNumber,
  requiredString, validateNumber,
  validateString
} from "../../../utils/validate/base.validate";
import { ListDto } from "../../../shared/dto/base.dto";

export class SocialCircleDto {
  @Rule(requiredNumber)
  id: number;

  @Rule(requiredNumber)
  creatorId: number;

  @Rule(requiredString)
  creatorName: string;

  @Rule(validateString)
  classifyName?: string;

  @Rule(validateNumber)
  classifyId?: number;

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

  @Rule(validateString)
  bannedReason?: string;
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

export class CreateSocialCircleDto extends OmitDto(SocialCircleDto, ["id", "bannedReason"]) {
}

export class CreateClientSocialCircleDto extends OmitDto(SocialCircleDto, ["id", "guide", "bannedReason"]) {
}

export class UpdateSocialCircleDto extends OmitDto(SocialCircleDto, ["status", "bannedReason"]) {
}

export class UpdateSocialCircleStatusDto extends PickDto(SocialCircleDto, ["id", "status", "bannedReason"]) {
}

export class UpdateSocialCircleGuideStatusDto extends PickDto(SocialCircleDto, ["id"]) {
  @Rule(givenValue([0, 1], true))
  guide: number;
}

export class getSocialCirclePageDto extends ListDto {
  @Rule(validateString)
  name?: string;

  @Rule(validateNumber)
  guide?: number;

  @Rule(givenValue([0, 1, 2, 3], false))
  status?: number;

  @Rule(validateNumber)
  classifyId?: number;

  @Rule(givenValue([0, 1], false))
  orphan?: number;
}
