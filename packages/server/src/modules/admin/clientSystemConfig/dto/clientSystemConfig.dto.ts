import { requiredString, validateNumber } from '@/utils/validate'
import { Rule } from '@midwayjs/validate'

export class ClientSystemConfigDto {
  @Rule(validateNumber)
  id: number

  @Rule(requiredString)
  clientName: string

  @Rule(requiredString)
  logo: string

  @Rule(requiredString)
  contentModel!: string
}
