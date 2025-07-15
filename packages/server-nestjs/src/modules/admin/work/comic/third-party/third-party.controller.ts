import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ApiDoc } from '@/common/decorators/api-doc.decorator'
import {
  PlatformResponseDto,
  SearchComicItemDto,
} from './dto/third-party-response.dto'
import { SearchComicRequestDto } from './dto/third-party.request'
import { WorkComicThirdPartyService } from './third-party-service'
import { PLATFORMS } from './third-party.constant'

@ApiTags('第三方漫画平台内容解析')
@Controller('admin/work/comic/third-party')
export class WorkComicThirdPartyController {
  constructor(private readonly thirdPartyService: WorkComicThirdPartyService) {}

  @Get('/platform')
  @ApiDoc({
    summary: '获取第三方漫画平台列表',
    model: PlatformResponseDto,
    isArray: true,
  })
  async getPlatforms() {
    return PLATFORMS
  }

  @Get('/search')
  @ApiDoc({
    summary: '搜索第三方平台漫画',
    model: SearchComicItemDto,
  })
  async searchComic(@Query() searchDto: SearchComicRequestDto) {
    return await this.thirdPartyService.searchComic(searchDto)
  }
}
