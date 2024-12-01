import { Rule } from '@midwayjs/validate'
import {
  requiredDate,
  requiredNumber,
  requiredNumberArray,
  requiredNumberLess,
  requiredString,
  validateNumber,
  validateNumberLess,
  validateString,
} from '@/utils/validate'
import { BasicPageDto } from '@/basic/dto/basic.dto'

export class ComicDto {
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
  categoryId!: number[]

  @Rule(requiredDate)
  publishAt!: Date

  @Rule(requiredString)
  description!: string

  @Rule(requiredString)
  publisher!: string

  @Rule(requiredNumberLess(2))
  isFinished!: number
}

export class ComicUpdateDto extends ComicDto {
  @Rule(requiredNumber)
  id!: number
}

export class ComicSearchDto extends BasicPageDto {
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
