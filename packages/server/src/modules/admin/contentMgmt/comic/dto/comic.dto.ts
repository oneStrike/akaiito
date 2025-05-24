import { PickDto, Rule } from '@midwayjs/validate'
import {
  requiredBoolean,
  requiredNumber,
  requiredNumberArray,
  requiredString,
  validateBoolean,
  validateDate,
  validateNumber,
  validateString,
} from '@/utils/validate'
import { BasicIdDTO, BasicPageDTO } from '@/basic/dto/basic.dto'

export class ComicDTO {
  @Rule(requiredString)
  name!: string

  @Rule(requiredString)
  alias!: string

  @Rule(requiredString)
  cover!: string

  @Rule(requiredString)
  language!: string

  @Rule(requiredString)
  region!: string

  @Rule(validateNumber)
  virtualPopularity?: number

  @Rule(requiredNumber)
  authorId!: number

  @Rule(requiredNumberArray)
  categoryIds!: number[]

  @Rule(validateString)
  ageRating?: string

  @Rule(validateDate)
  publishAt?: Date

  @Rule(requiredString)
  description!: string

  @Rule(validateString)
  publisher?: string

  @Rule(requiredBoolean)
  isFinished!: boolean

  @Rule(validateBoolean)
  canDownload?: boolean

  @Rule(validateBoolean)
  canComment?: boolean

  @Rule(validateNumber)
  viewRule?: number

  @Rule(validateNumber)
  purchaseAmount?: number
}

export class ComicUpdateDTO extends ComicDTO {
  @Rule(requiredNumber)
  id!: number
}

export class ComicSearchDTO extends BasicPageDTO {
  @Rule(validateString)
  name?: string

  @Rule(validateString)
  authorName?: string

  @Rule(validateNumber)
  viewRule?: number

  @Rule(validateNumber)
  categoryId?: number

  @Rule(validateBoolean)
  isFinished?: boolean

  @Rule(validateBoolean)
  isPublish?: boolean
}

export class ComicPublishDTO extends BasicIdDTO {
  @Rule(validateBoolean)
  isPublish?: boolean
}

export class ComicRuleDTO extends PickDto(ComicDTO, [
  'canComment',
  'canDownload',
  'viewRule',
  'purchaseAmount',
]) {
  @Rule(requiredNumber)
  id!: number
}
