import { Rule } from '@midwayjs/validate'
import { requiredNumber } from '@/utils/validate'


export class RemoveChapterContentDTO {
  @Rule(requiredNumber)
  chapterId!: number
}
