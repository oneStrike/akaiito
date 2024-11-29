import { Rule } from '@midwayjs/validate'
import { requiredDate, requiredNumber, requiredNumberLess, requiredString, validateNumber } from '@/utils/validate'
import { BasicPageDto } from '@/basic/dto/basic.dto'

export class ComicDto {
  @Rule(requiredString)
  name!: string

  @Rule(requiredString)
  cover!: string

  @Rule(validateNumber)
  virtualPopularity?: number

  @Rule(requiredNumber)
  authorId!: number

  @Rule(requiredNumber)
  categoryId!: number

  @Rule(requiredDate)
  publishAt!: Date

  @Rule(requiredString)
  description?: string

  @Rule(requiredString)
  publisher?: string

  @Rule(requiredNumberLess(2))
  isFinished?: number
}

export class ComicUpdateDto extends ComicDto {
  @Rule(requiredNumber)
  id!: number
}

export class ComicSearchDto extends BasicPageDto {
  @Rule(requiredString)
  name?: string

  @Rule(requiredNumber)
  authorId?: number

  @Rule(requiredNumber)
  categoryId?: number

  @Rule(requiredNumberLess(2))
  isFinished?: number

  @Rule(requiredNumberLess(2))
  status?: number
}
