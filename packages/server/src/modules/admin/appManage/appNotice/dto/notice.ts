import { PickDto, Rule } from '@midwayjs/validate'
import { requiredNumber, requiredString, validateNumberLess, validateString } from '@/utils/validate'

export class NoticeDto {
  @Rule(requiredString)
  title!: string

  @Rule(requiredString)
  content!: string

  @Rule(validateString)
  pageCode?: string

  @Rule(validateString)
  pageName?: string

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

export class UpdateNoticeDto extends NoticeDto {
  @Rule(requiredNumber)
  id!: number
}
