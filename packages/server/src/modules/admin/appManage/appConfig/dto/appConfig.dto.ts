import { requiredString, validateNumber } from '@/utils/validate'
import { Rule } from '@midwayjs/validate'

export class AppConfigDto {
  @Rule(validateNumber)
  id: number

  @Rule(requiredString)
  appName: string

  @Rule(requiredString)
  logo: string

  @Rule(requiredString)
  contentModel!: string
}
