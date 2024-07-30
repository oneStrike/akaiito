import { Rule } from '@midwayjs/validate'
import { requiredString, validateNumber } from '@/utils/validate'

export class ClientSystemConfigDto {
  @Rule(validateNumber)
  id: number

  @Rule(requiredString)
  clientName: string

  @Rule(requiredString)
  logo: string
}
