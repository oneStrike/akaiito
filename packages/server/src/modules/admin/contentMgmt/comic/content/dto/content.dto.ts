import { Rule } from '@midwayjs/validate'
import { requiredNumber, requiredString } from '@/utils/validate'

export class ComicContentDTO {
  @Rule(requiredNumber)
  id!: number

  @Rule(requiredString)
  url!: string

  @Rule(requiredNumber)
  chapterId!: number
}
