import { OmitDto, PickDto, Rule } from '@midwayjs/validate'
import { requiredNumber, requiredString, validateDate, validateNumberLess, validateString } from '@/utils/validate'
import { BasicIdDTO } from '@/basic/dto/basic.dto'

export class NoticeDTO {
  @Rule(requiredString)
  title!: string

  @Rule(requiredString)
  content!: string

  @Rule(validateString)
  pageCode?: string

  @Rule(validateString)
  pageName?: string

  @Rule(validateDate)
  startTime?: Date

  @Rule(validateDate)
  endTime?: Date

  @Rule(validateString)
  backgroundImage?: string

  @Rule(validateNumberLess(2))
  enableApplet?: number

  @Rule(validateNumberLess(2))
  enableWeb?: number

  @Rule(validateNumberLess(2))
  enableApp?: number
}

export class getNoticeListDTO extends PickDto(NoticeDTO, ['enableApplet', 'enableWeb', 'enableApp']) {}

export class UpdateNoticeDTO extends OmitDto(NoticeDTO, ['title', 'content']) {
  @Rule(requiredNumber)
  id!: number

  @Rule(validateString)
  title?: string

  @Rule(validateString)
  content?: string
}

export class PublishNoticeDTO extends BasicIdDTO {
  @Rule(validateNumberLess(2))
  isPublish?: number
}
