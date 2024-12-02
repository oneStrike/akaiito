import { BasicIdStatusDTO, BasicPageDTO } from '@/basic/dto/basic.dto'
import {
  requiredNumberLess,
  requiredString,
  validateNumber,
  validateNumberLess,
  validateString,
} from '@/utils/validate'
import { OmitDto, Rule } from '@midwayjs/validate'

export class CategoryDTO extends BasicIdStatusDTO {
  @Rule(requiredString)
  name!: string

  @Rule(requiredString)
  icon!: string

  @Rule(validateNumber)
  auxiliaryHot?: number

  @Rule(validateNumber)
  sort?: number

  @Rule(requiredNumberLess(2))
  novelApplicable!: number

  @Rule(requiredNumberLess(2))
  comicApplicable!: number

  @Rule(requiredNumberLess(2))
  photoApplicable!: number

  @Rule(requiredNumberLess(2))
  illustratorApplicable!: number
}

export class CategoryListDTO extends BasicPageDTO {
  @Rule(validateString)
  name?: string

  @Rule(validateNumber)
  status?: number

  @Rule(validateNumberLess(2))
  novelApplicable?: number

  @Rule(validateNumberLess(2))
  comicApplicable?: number

  @Rule(validateNumberLess(2))
  photoApplicable?: number

  @Rule(validateNumberLess(2))
  illustratorApplicable?: number
}

export class CreateCategoryDTO extends OmitDto(CategoryDTO, ['id', 'status']) {}

export class UpdateCategoryDTO extends OmitDto(CategoryDTO, ['status']) {}
