import { PickDto, Rule } from '@midwayjs/validate'
import {
  givenValue,
  requiredNumber,
  requiredString
} from '../../../utils/validate/base.validate'

//素材库
class MaterialLibraryDto {
  @Rule(requiredNumber)
  id: number

  @Rule(requiredString)
  groupName: string
}

export class CreateDto extends PickDto(MaterialLibraryDto, ['groupName']) {}
export class DeleteDto extends PickDto(MaterialLibraryDto, ['id']) {}
export class ModifyDto extends MaterialLibraryDto {}

//素材
export class AddMaterialDto {
  @Rule(requiredString)
  path: string

  @Rule(requiredNumber)
  groupId?: number

  @Rule(requiredString)
  materialName?: string

  @Rule(givenValue(['image', 'video', 'url'], false))
  materialType?: string
}

export class DeleteMaterialDto {
  @Rule(requiredNumber)
  id: number
}

export class MaterialGroupDto extends PickDto(AddMaterialDto, [
  'groupId',
  'materialType',
  'materialName'
]) {}
