import { BasicIdStatusDto } from '@/basic/dto/basic.dto'
import { givenValue, requiredString, validateNumber, validateString } from '@/utils/validate'
import { OmitDto, Rule } from '@midwayjs/validate'

export class CategoryDto extends BasicIdStatusDto {
  @Rule(requiredString)
  name!: string

  @Rule(validateNumber)
  auxiliaryHot?: number

  @Rule(validateNumber)
  sort?: number

  @Rule(givenValue([0, 1]))
  novelModel!: number

  @Rule(givenValue([0, 1]))
  mangaModel!: number

  @Rule(givenValue([0, 1]))
  imageModel!: number
}

export class CategoryListDto {
  @Rule(validateString)
  name?: string

  @Rule(validateNumber)
  status?: number

  @Rule(givenValue([0, 1], false))
  novelModel?: number

  @Rule(givenValue([0, 1], false))
  mangaModel?: number

  @Rule(givenValue([0, 1], false))
  imageModel?: number
}

export class CreateCategoryDto extends OmitDto(CategoryDto, ['id', 'status']) {}

export class UpdateCategoryDto extends OmitDto(CategoryDto, ['status']) {}
