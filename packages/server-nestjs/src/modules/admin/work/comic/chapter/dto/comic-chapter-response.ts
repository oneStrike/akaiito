import { ApiProperty } from '@nestjs/swagger'
import { BaseComicChapterDto } from '@/modules/admin/work/comic/chapter/dto/comic-chapter.dto'

/**
 * 关联的漫画信息
 */
export class RelatedComicDto {
  @ApiProperty({ description: '漫画ID', example: 1 })
  id: number

  @ApiProperty({ description: '漫画名字', example: '示例漫画' })
  name: string
}

/**
 * 关联的漫画版本信息
 */
export class RelatedVersionDto {
  @ApiProperty({ description: '版本ID', example: 1 })
  id: number

  @ApiProperty({ description: '版本名字', example: '第一版' })
  versionName: string

  @ApiProperty({ description: '版本语言', example: 'zh' })
  language: string
}

/**
 * 漫画详情接口响应dto
 */

export class ComicChapterDetailDto extends BaseComicChapterDto {
  @ApiProperty({
    description: '关联的漫画信息',
    type: RelatedComicDto,
  })
  relatedComic: RelatedComicDto

  @ApiProperty({
    description: '关联的漫画版本信息',
    type: RelatedVersionDto,
    nullable: true,
  })
  relatedVersion: RelatedVersionDto | null
}
