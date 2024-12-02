import { Rule } from '@midwayjs/validate'
import {
  requiredNumber,
  requiredNumberArray,
  requiredNumberLess,
  requiredString,
  validateDate,
  validateNumber,
  validateNumberLess,
  validateString,
} from '@/utils/validate'
import { BasicPageDTO } from '@/basic/dto/basic.dto'

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

  @Rule(validateDate)
  publishAt?: Date

  @Rule(requiredString)
  description!: string

  @Rule(requiredString)
  publisher!: string

  @Rule(requiredNumberLess(2))
  isFinished!: number
}

export class ComicUpdateDTO extends ComicDTO {
  @Rule(requiredNumber)
  id!: number
}

export class ComicSearchDTO extends BasicPageDTO {
  @Rule(validateString)
  name?: string

  @Rule(validateNumber)
  authorId?: number

  @Rule(validateNumber)
  categoryId?: number

  @Rule(validateNumberLess(2))
  isFinished?: number

  @Rule(validateNumberLess(2))
  isPublish?: number
}
