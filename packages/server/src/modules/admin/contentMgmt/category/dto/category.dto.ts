import { BasicIdStatusDto } from '@/basic/dto/basic.dto'
import {
  requiredString,
  validateNumber,
  validateNumberLess,
  validateString,
} from '@/utils/validate'
import { OmitDto, Rule } from '@midwayjs/validate'

export class CategoryDto extends BasicIdStatusDto {
  @Rule(requiredString)
  name!: string

  @Rule(validateNumber)
  auxiliaryHot?: number

  @Rule(validateNumber)
  sort?: number

  @Rule(validateNumberLess(3))
  contentModel?: number
}

export class CategoryListDto {
  @Rule(validateString)
  name?: string

  @Rule(validateNumber)
  status?: number

  @Rule(validateNumberLess(3))
  contentModel?: number
}

export class CreateCategoryDto extends OmitDto(CategoryDto, ['id', 'status']) {}

export class UpdateCategoryDto extends OmitDto(CategoryDto, ['status']) {}
