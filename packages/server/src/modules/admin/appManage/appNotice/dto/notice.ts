import { OmitDto, PickDto, Rule } from '@midwayjs/validate'
import { requiredNumber, requiredString, validateDate, validateNumberLess, validateString } from '@/utils/validate'
import { BasicIdDto } from '@/basic/dto/basic.dto'

export class NoticeDto {
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

export class getNoticeListDto extends PickDto(NoticeDto, ['enableApplet', 'enableWeb', 'enableApp']) {}

export class UpdateNoticeDto extends OmitDto(NoticeDto, ['title', 'content']) {
  @Rule(requiredNumber)
  id!: number

  @Rule(validateString)
  title?: string

  @Rule(validateString)
  content?: string
}

export class PublishNoticeDto extends BasicIdDto {
  @Rule(validateNumberLess(2))
  isPublish?: number
}
