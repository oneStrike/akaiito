import { Rule } from '@midwayjs/validate'
import { requiredNumber } from '@/utils/validate'

export class CreateComicContentDTO {
  @Rule(requiredNumber)
  chapterId!: number // 章节ID

  @Rule(requiredNumber)
  comicId!: number // 漫画ID
}

export class RemoveChapterContentDTO {
  @Rule(requiredNumber)
  chapterId!: number
}
