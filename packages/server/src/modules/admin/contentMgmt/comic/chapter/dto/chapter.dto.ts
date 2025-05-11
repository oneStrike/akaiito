import { PickDto, Rule } from '@midwayjs/validate'
import {
  requiredNumber,
  requiredString,
  validateBoolean,
  validateNumber,
  validateNumberLess,
  validateString, validateStringArray,
} from '@/utils/validate'
import { BasicPageDTO } from '@/basic/dto/basic.dto'

export class ChapterDTO {
  @Rule(requiredString)
  title!: string

  @Rule(validateStringArray)
  content?: string[]

  @Rule(validateNumber)
  comicId?: number

  @Rule(validateNumber)
  order?: number

  @Rule(validateNumberLess(4))
  viewRule?: number

  @Rule(validateString)
  remark?: string

  @Rule(validateNumber)
  purchaseAmount?: number

  @Rule(validateBoolean)
  isPublish?: boolean
}

export class ChapterPageDTO extends BasicPageDTO {
  @Rule(requiredNumber)
  comicId!: number

  @Rule(validateBoolean)
  isPublish?: boolean

  @Rule(validateString)
  title?: string
}

export class UpdateChapterDTO extends PickDto(ChapterDTO, ['purchaseAmount', 'viewRule', 'title', 'order']) {
  @Rule(requiredNumber)
  id!: number
}

export class updateChapterPublishDTO extends PickDto(ChapterDTO, ['isPublish']) {
  @Rule(requiredNumber)
  id!: number
}

export class AddChapterContentDTO extends PickDto(ChapterDTO, ['content']) {
  @Rule(requiredNumber)
  id!: number
}
