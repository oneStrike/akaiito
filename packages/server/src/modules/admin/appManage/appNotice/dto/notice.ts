import { OmitDto, PickDto, Rule } from '@midwayjs/validate'
import { requiredNumber, requiredString, validateBoolean, validateDate, validateString } from '@/utils/validate'
import { BasicIdDTO } from '@/basic/dto/basic.dto'

export class NoticeDTO {
  @Rule(requiredString)
  title!: string

  @Rule(requiredString)
  content!: string

  @Rule(validateString)
  pageCode?: string

  @Rule(validateDate)
  startTime?: Date

  @Rule(validateDate)
  endTime?: Date

  @Rule(validateString)
  backgroundImage?: string

  @Rule(validateBoolean)
  enableApplet?: boolean

  @Rule(validateBoolean)
  enableWeb?: boolean

  @Rule(validateBoolean)
  enableApp?: boolean
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
  @Rule(validateBoolean)
  isPublish?: boolean
}
