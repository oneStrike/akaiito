import { Rule } from '@midwayjs/validate'
import { requiredNumber } from '../../utils/validate/base.validate'

export class IdDto {
  @Rule(requiredNumber)
  id: number
}
