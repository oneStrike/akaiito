import { Rule } from '@midwayjs/validate'
import { requiredNumberLess, requiredString, validateNumberLess, validateString } from '@/utils/validate'
import { BasicPageDTO } from '@/basic/dto/basic.dto'

export class AppPagesDTO {
  @Rule(requiredString)
  pageCode!: string

  @Rule(requiredString)
  pageName!: string

  @Rule(requiredString)
  pagePath!: string

  @Rule(requiredNumberLess(4))
  pageRule!: number

  @Rule(requiredNumberLess(4))
  status!: number

  @Rule(validateString)
  description?: string
}

export class AppPageQueryDTO extends BasicPageDTO {
  @Rule(validateString)
  pageName?: string

  @Rule(validateNumberLess(4))
  pageRule?: number

  @Rule(validateNumberLess(4))
  status?: number
}
