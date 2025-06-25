import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger'
import {
  ValidateBoolean,
  ValidateDate,
  ValidateEnum,
  ValidateNumber,
  ValidateNumberArray,
  ValidateString,
} from '@/common/decorators/validate.decorator'
import { IdDto } from '@/common/dto/id.dto'
import { PageDto } from '@/common/dto/page.dto'
import { AuthorGenderEnum, AuthorRoleEnum } from '../author.constant'

/**
 * 作者基础DTO
 */
export class BaseAuthorDto {
  @ValidateNumber({
    description: '作者ID',
    example: 1,
    required: true,
    min: 1,
  })
  id!: number

  @ValidateString({
    description: '作者姓名',
    example: '村上春树',
    required: true,
  })
  name!: string

  @ValidateString({
    description: '作者头像URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatar?: string

  @ValidateString({
    description: '作者描述',
    example: '日本著名小说家，代表作有《挪威的森林》等',
    required: false,
  })
  description?: string

  @ValidateBoolean({
    description: '启用状态（true: 启用, false: 禁用）',
    example: true,
    required: true,
    default: true,
  })
  isEnabled!: boolean

  @ValidateNumber({
    description: '作者身份角色（位运算：1=作家, 2=插画家, 4=漫画家, 8=模特）',
    example: AuthorRoleEnum.WRITER,
    required: false,
    min: 0,
    default: 0,
  })
  roles?: number

  @ValidateString({
    description: '国籍',
    example: '日本',
    required: false,
  })
  nationality?: string

  @ValidateEnum({
    description: '性别（0: 未知, 1: 男性, 2: 女性, 3: 其他）',
    example: AuthorGenderEnum.MALE,
    required: true,
    enum: AuthorGenderEnum,
    default: AuthorGenderEnum.UNKNOWN,
  })
  gender!: AuthorGenderEnum

  @ValidateString({
    description: '社交媒体链接（JSON格式存储多个平台链接）',
    example: '{"twitter":"@author","instagram":"@author_ig"}',
    required: false,
  })
  socialLinks?: string

  @ValidateString({
    description: '管理员备注',
    example: '优秀作者，作品质量高',
    required: false,
  })
  remark?: string

  @ValidateDate({
    description: '创建时间',
    example: '2024-01-01T00:00:00.000Z',
    required: true,
  })
  createdAt!: Date

  @ValidateDate({
    description: '更新时间',
    example: '2024-01-01T00:00:00.000Z',
    required: true,
  })
  updatedAt!: Date

  @ValidateNumber({
    description: '作品数量（冗余字段，用于提升查询性能）',
    example: 10,
    required: true,
    min: 0,
    default: 0,
  })
  worksCount!: number

  @ValidateNumber({
    description: '粉丝数量（冗余字段，用于前台展示）',
    example: 1000,
    required: true,
    min: 0,
    default: 0,
  })
  followersCount!: number

  @ValidateBoolean({
    description: '是否为推荐作者（用于前台推荐展示）',
    example: false,
    required: true,
    default: false,
  })
  featured!: boolean
}

/**
 * 创建作者DTO
 */
export class CreateAuthorDto extends OmitType(BaseAuthorDto, [
  'id',
  'createdAt',
  'updatedAt',
  'worksCount',
  'followersCount',
]) {}

/**
 * 更新作者DTO
 */
export class UpdateAuthorDto extends IntersectionType(
  PartialType(
    OmitType(BaseAuthorDto, [
      'id',
      'createdAt',
      'updatedAt',
      'worksCount',
      'followersCount',
    ]),
  ),
  IdDto,
) {}

/**
 * 查询作者DTO
 */
export class QueryAuthorDto extends IntersectionType(
  PageDto,
  PickType(PartialType(BaseAuthorDto), [
    'name',
    'isEnabled',
    'roles',
    'nationality',
    'gender',
    'featured',
  ]),
) {
  @ValidateString({
    description: '作者姓名（模糊搜索）',
    example: '村上',
    required: false,
  })
  name?: string
}

/**
 * 更新作者推荐状态DTO
 */
export class UpdateAuthorFeaturedDto extends PickType(BaseAuthorDto, [
  'featured',
]) {
  @ValidateNumberArray({
    description: '作者ID列表',
    example: [1, 2, 3],
    required: true,
  })
  ids!: number[]
}

/**
 * 作者分页响应DTO
 */
export class AuthorPageResponseDto extends OmitType(BaseAuthorDto, [
  'remark',
  'socialLinks',
  'nationality',
  'description',
]) {}

/**
 * 作者详情响应DTO
 */
export class AuthorDetailResponseDto extends BaseAuthorDto {}
