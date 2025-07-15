import { ValidateString } from '@/common/decorators/validate.decorator'

export class SearchComicRequestDto {
  @ValidateString({
    required: true,
    maxLength: 100,
    description: '搜索关键词',
    example: '进击的巨人',
  })
  keyword!: string

  @ValidateString({
    required: true,
    maxLength: 10,
    description: '平台代码',
    example: 'copy',
  })
  platform!: string
}
