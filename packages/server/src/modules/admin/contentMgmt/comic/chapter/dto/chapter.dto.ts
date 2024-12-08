import { PickDto, Rule } from '@midwayjs/validate'
import { requiredNumber, requiredString, validateBoolean, validateNumber, validateNumberLess } from '@/utils/validate'

export class ChapterDTO {
  @Rule(requiredString)
  title!: string

  @Rule(validateNumber)
  comicId?: number

  @Rule(validateNumber)
  novelId?: number

  @Rule(validateNumber)
  sortOrder?: number

  @Rule(validateNumberLess(4))
  viewRule?: number

  @Rule(validateNumber)
  purchaseAmount?: number

  @Rule(validateBoolean)
  isPublish?: boolean
}

export class ChapterPageDTO extends PickDto(ChapterDTO, ['novelId', 'comicId']) {}

export class UpdateChapterDTO extends PickDto(ChapterDTO, ['purchaseAmount', 'viewRule', 'title']) {
  @Rule(requiredNumber)
  id!: number
}

export class updateChapterPublishDTO extends PickDto(ChapterDTO, ['isPublish']) {
  @Rule(requiredNumber)
  id!: number
}
