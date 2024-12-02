import { Rule } from '@midwayjs/validate'
import { givenValue, requiredString } from '@/utils/validate'

export class ThirdPartyServiceDTO {
  @Rule(givenValue(['copy']))
  service!: string
}

export class ThirdPartyQueryDTO extends ThirdPartyServiceDTO {
  @Rule(requiredString)
  keyword!: string
}

export class ThirdPartyParseDTO extends ThirdPartyServiceDTO {
  @Rule(requiredString)
  id!: string
}
