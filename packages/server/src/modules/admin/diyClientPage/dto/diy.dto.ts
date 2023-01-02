import { OmitDto, PickDto, Rule } from '@midwayjs/validate'
import {
  givenValue,
  requiredNumber,
  requiredString
} from '../../../../utils/validate/base.validate'

export class DiyDto {
  @Rule(requiredNumber)
  id: number

  @Rule(requiredString)
  diyName: string

  @Rule(requiredString)
  diyData: string

  @Rule(givenValue([0, 1], false))
  use?: number
}

export class CreateDiyDto extends OmitDto(DiyDto, ['id']) {}

export class SwitchDiyPageStatusDto extends PickDto(DiyDto, ['id', 'use']) {}
