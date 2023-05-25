import { Rule } from '@midwayjs/validate'
import { requiredString } from '../../../../utils/validate/base.validate'

export class ClientConfigureDto {
  @Rule(requiredString)
  privacyTitle: string

  @Rule(requiredString)
  privacyMessage: string

  @Rule(requiredString)
  privacySecondTitle: string

  @Rule(requiredString)
  privacySecondMessage: string
}
