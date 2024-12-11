import { Rule } from '@midwayjs/validate'
import { requiredNumber, requiredString } from '@/utils/validate'

export class ContentDTO {
  @Rule(requiredString)
  url!: string

  @Rule(requiredNumber)
  chapterId!: number
}
