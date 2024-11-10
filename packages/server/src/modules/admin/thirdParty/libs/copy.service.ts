import { Inject, Provide } from '@midwayjs/core'
import { HttpService } from '@midwayjs/axios'

const baseUrl = 'https://api.mangacopy.com'
const headers = {
  platform: 3,
  version: '2.2.5',
}

@Provide()
export class CopyMangaService {
  @Inject()
  httpService: HttpService

  async searchWord(keyword: string) {
    const { data } = await this.httpService.get(`${baseUrl}/api/v3/search/comic`, {
      params: {
        q: keyword,
        limit: 30,
        offset: 0,
      },
      headers,
    })
    if (data.code !== 200) {
      return { code: 201 }
    }
    return {
      code: 200,
      data: data.results.list.map((item) => ({
        id: item.path_word,
        name: item.name,
        cover: item.cover,
        author: item.author,
      })),
    }
  }

  async parseWord(id: string) {}

  async wordDetail(path: string) {
    const data = await this.httpService.get(`${baseUrl}/api/v3/comic2/${path}?in_mainland=true&platform=3`)
    console.log(data)
  }

  async chapterList(path: string) {
    const data = await this.httpService.get(
      `${baseUrl}/api/v3/comic/${path}/group/default/chapters?limit=500&offset=0&in_mainland=true&platform=3`,
    )
    console.log(data)
  }

  async chapterContent(path: string, chapterId: string) {
    const data = await this.httpService.get(
      `${baseUrl}//api/v3/comic/${path}/chapter2/${chapterId}?in_mainland=true&platform=3`,
    )
    console.log(data)
  }
}
