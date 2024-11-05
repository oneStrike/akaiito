import { httpClient } from '@/utils/request'

export class WorkApi {
  wordPath: string
  wordId: string
  limit: number
  offset: number
  wordType: 'comic' | 'book' | 'photos'
  apiPath: IterateObject

  constructor(path: string, id: string, type: WorkApi['wordType']) {
    this.wordType = type
    this.wordPath = path
    this.wordId = id
    this.limit = 500
    this.offset = 0
    this.apiPath = {
      detail: {
        comic: `/api/v3/comic2/${this.wordPath}`,
      },
      relation: {
        comic: `/api/v3/comic2/${this.wordPath}/query`,
      },
      chapters: {
        comic: `/api/v3/comic/${this.wordPath}/group/default/chapters`,
      },
      content: {
        comic: `/api/v3/comic/${this.wordPath}/chapter2/${this.wordId}`,
      },
    }
  }

  // 详情
  detail(): Promise<any> {
    return httpClient({
      method: 'GET',
      url: this.apiPath.detail[this.wordType],
    })
  }

  // 作品和用户关联关系
  relation(): Promise<any> {
    return httpClient({
      method: 'GET',
      url: this.apiPath.relation[this.wordType],
    })
  }

  // 章节列表
  chapters(): Promise<any> {
    return httpClient({
      method: 'GET',
      url: this.apiPath.chapters[this.wordType],
      data: {
        limit: this.limit,
        offset: this.offset,
      },
    })
  }

  // 内容
  content(): Promise<any> {
    return httpClient({
      method: 'GET',
      url: this.apiPath.content[this.wordType],
    })
  }
}
