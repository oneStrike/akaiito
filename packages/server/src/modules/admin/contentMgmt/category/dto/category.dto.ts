import { BasicIdStatusDto, BasicPageDto } from '@/basic/dto/basic.dto'
import {
  requiredNumberLess,
  requiredString,
  validateNumber,
  validateNumberLess,
  validateString,
} from '@/utils/validate'
import { OmitDto, Rule } from '@midwayjs/validate'

export class CategoryDto extends BasicIdStatusDto {
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

export class CategoryListDto extends BasicPageDto {
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

export class CreateCategoryDto extends OmitDto(CategoryDto, ['id', 'status']) {}

export class UpdateCategoryDto extends OmitDto(CategoryDto, ['status']) {}
