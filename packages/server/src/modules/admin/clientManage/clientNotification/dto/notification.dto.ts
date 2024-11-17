import { PickDto, Rule } from '@midwayjs/validate'
import { requiredString, validateNumberLess, validateString } from '@/utils/validate'

export class NotificationDto {
  @Rule(requiredString)
  content!: string

  @Rule(requiredString)
  pageCode!: string

  @Rule(requiredString)
  pageName!: string

  @Rule(validateString)
  backgroundImage?: string

  @Rule(validateNumberLess(2))
  enableApplet?: number

  @Rule(validateNumberLess(2))
  enableWeb?: number

  @Rule(validateNumberLess(2))
  enableApp?: number
}

export class getNotificationListDto extends PickDto(NotificationDto, ['enableApplet', 'enableWeb', 'enableApp']) {}
