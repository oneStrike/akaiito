import { BasicIdStatusDTO, BasicPageDTO } from '@/basic/dto/basic.dto'
import { requiredBoolean, requiredString, validateBoolean, validateNumber, validateString } from '@/utils/validate'
import { OmitDto, Rule } from '@midwayjs/validate'

export class CategoryDTO extends BasicIdStatusDTO {
  @Rule(requiredString)
  name!: string

  @Rule(requiredString)
  icon!: string

  @Rule(validateNumber)
  virtualPopularity?: number

  @Rule(validateNumber)
  order?: number

  @Rule(requiredBoolean)
  novelApplicable!: boolean

  @Rule(requiredBoolean)
  comicApplicable!: boolean

  @Rule(requiredBoolean)
  photoApplicable!: boolean

  @Rule(requiredBoolean)
  illustratorApplicable!: boolean
}

export class CategoryListDTO extends BasicPageDTO {
  @Rule(validateString)
  name?: string

  @Rule(validateBoolean)
  status?: boolean

  @Rule(validateBoolean)
  novelApplicable?: boolean

  @Rule(validateBoolean)
  comicApplicable?: boolean

  @Rule(validateBoolean)
  photoApplicable?: boolean

  @Rule(validateBoolean)
  illustratorApplicable?: boolean
}

export class CreateCategoryDTO extends OmitDto(CategoryDTO, ['id', 'status']) {
}

export class UpdateCategoryDTO extends OmitDto(CategoryDTO, ['status']) {
}
