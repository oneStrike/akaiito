import { Rule } from '@midwayjs/validate'
import { requiredNumber, validateStringArray } from '@/utils/validate'

export class ComicContentDTO {

  @Rule(validateStringArray)
  urls!: string[]

  @Rule(requiredNumber)
  chapterId!: number
}

export class RemoveChapterContentDTO {
  @Rule(requiredNumber)
  chapterId!: number
}
