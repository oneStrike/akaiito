import { Rule } from '@midwayjs/validate'
import { requiredNumberLess, requiredString, validateNumberLess, validateString } from '@/utils/validate'
import { BasicPageDto } from '@/basic/dto/basic.dto'

export class ClientPagesDto {
  @Rule(requiredString)
  pageCode!: string

  @Rule(requiredString)
  pageName!: string

  @Rule(requiredString)
  pagePath!: string

  @Rule(requiredNumberLess(4))
  pageRule!: number

  @Rule(validateString)
  description?: string
}

export class ClientPageQueryDto extends BasicPageDto {
  @Rule(validateString)
  pageName?: string

  @Rule(validateNumberLess(4))
  pageRule?: number

  @Rule(validateNumberLess(4))
  status?: number
}
