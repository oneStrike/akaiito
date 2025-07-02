import { ValidateBoolean } from '../decorators/validate.decorator'
import { IdDto } from './id.dto'

export class IdEnabledDto extends IdDto {
  @ValidateBoolean({
    description: '状态 true启用 false禁用',
    example: true,
    required: true,
  })
  isEnabled: boolean
}
