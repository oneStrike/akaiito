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
  novelModel!: number

  @Rule(requiredNumberLess(2))
  mangaModel!: number

  @Rule(requiredNumberLess(2))
  imageModel!: number
}

export class CategoryListDto extends BasicPageDto {
  @Rule(validateString)
  name?: string

  @Rule(validateNumber)
  status?: number

  @Rule(validateNumberLess(2))
  novelModel?: number

  @Rule(validateNumberLess(2))
  mangaModel?: number

  @Rule(validateNumberLess(2))
  imageModel?: number
}

export class CreateCategoryDto extends OmitDto(CategoryDto, ['id', 'status']) {}

export class UpdateCategoryDto extends OmitDto(CategoryDto, ['status']) {}
