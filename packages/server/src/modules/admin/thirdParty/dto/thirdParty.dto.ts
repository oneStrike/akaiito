import { Rule } from '@midwayjs/validate'
import { givenValue, requiredString } from '@/utils/validate'

export class ThirdPartyServiceDto {
  @Rule(givenValue(['copy']))
  service!: string
}

export class ThirdPartyQueryDto extends ThirdPartyServiceDto {
  @Rule(requiredString)
  keyword!: string
}

export class ThirdPartyParseDto extends ThirdPartyServiceDto {
  @Rule(requiredString)
  id!: string
}
