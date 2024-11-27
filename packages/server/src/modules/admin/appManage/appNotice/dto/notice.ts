import { PickDto, Rule } from '@midwayjs/validate'
import { requiredString, validateNumberLess, validateString } from '@/utils/validate'

export class Notice {
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

export class getNoticeListDto extends PickDto(Notice, ['enableApplet', 'enableWeb', 'enableApp']) {}
