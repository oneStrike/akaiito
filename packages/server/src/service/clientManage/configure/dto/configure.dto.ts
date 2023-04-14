import { Rule } from '@midwayjs/validate'
import { validateUrl } from '../../../../utils/validate/base.validate'

export class ClientConfigureDto {
  @Rule(validateUrl)
  service_agreement: string

  @Rule(validateUrl)
  privacy_agreement: string
}
