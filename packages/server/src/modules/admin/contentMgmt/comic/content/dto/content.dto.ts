import { Rule } from '@midwayjs/validate'
import { requiredNumber, requiredString, validateNumber } from '@/utils/validate'

export class ComicContentDTO {
  @Rule(validateNumber)
  id?: number

  @Rule(requiredString)
  url!: string

  @Rule(requiredNumber)
  chapterId!: number
}

