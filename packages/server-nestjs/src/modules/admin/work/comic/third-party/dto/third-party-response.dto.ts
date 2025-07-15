import { ApiProperty } from '@nestjs/swagger'

export class PlatformResponseDto {
  @ApiProperty({
    description: '平台名称',
    example: '拷贝',
    type: 'string',
    required: true,
  })
  name: string

  @ApiProperty({
    description: '平台名称code',
    example: 'copy',
    type: 'string',
    required: true,
  })
  code: string
}

export class SearchComicItemDto {
  @ApiProperty({
    description: '漫画ID',
    example: 'shingeki-no-kyojin',
    type: 'string',
  })
  id: string

  @ApiProperty({
    description: '漫画名称',
    example: '进击的巨人',
    type: 'string',
  })
  name: string

  @ApiProperty({
    description: '封面图片URL',
    example: 'https://example.com/cover.jpg',
    type: 'string',
  })
  cover: string

  @ApiProperty({
    description: '作者列表',
    type: [String],
    example: ['谏山创'],
  })
  author: string[]

  @ApiProperty({
    description: '来源平台',
    example: '拷贝',
    type: 'string',
  })
  source: string
}
