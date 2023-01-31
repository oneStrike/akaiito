import { PickDto, Rule } from '@midwayjs/validate'
import {
  givenValue,
  requiredNumber,
  requiredString,
  validateNumber,
  validateString
} from '../../../../utils/validate/base.validate'
import { ListDto } from '../../../../shared/dto/list.dto'

//素材库
export class MaterialLibraryDto {
  @Rule(requiredNumber)
  id: number

  @Rule(requiredString)
  groupName: string
}

export class CreateMaterialLibraryDto extends PickDto(MaterialLibraryDto, [
  'groupName'
]) {}

//素材
export class MaterialDto {
  @Rule(requiredString)
  path: string

  @Rule(requiredString)
  materialName: string

  @Rule(givenValue(['image', 'video', 'url'], true))
  materialType: string
}

//添加素材
export class CreateMaterialDto {
  @Rule(requiredNumber)
  groupId: number

  @Rule(MaterialDto)
  material: MaterialDto[]
}

//查找素材
export class FindMaterialDto extends ListDto {
  @Rule(validateNumber)
  groupId?: number

  @Rule(validateString)
  materialName?: string

  @Rule(givenValue(['image', 'video', 'url'], false))
  materialType?: string
}
