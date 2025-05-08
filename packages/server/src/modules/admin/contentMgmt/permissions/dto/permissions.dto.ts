import { Rule } from '@midwayjs/validate'
import {
  requiredBoolean,
  requiredNumber,
  validateNumber,
} from '@/utils/validate'

export class CreateWorkPermissionsDTO {
  @Rule(requiredNumber)
  workId!: number

  @Rule(requiredBoolean)
  canDownload!: boolean

  @Rule(requiredBoolean)
  canComment!: boolean

  @Rule(requiredBoolean)
  canLike!: boolean

  @Rule(requiredBoolean)
  canFollow!: boolean

  @Rule(requiredBoolean)
  canReward!: boolean

  @Rule(requiredBoolean)
  canShare!: boolean

  @Rule(requiredNumber)
  viewRule!: number

  @Rule(validateNumber)
  purchaseAmount?: number
}
