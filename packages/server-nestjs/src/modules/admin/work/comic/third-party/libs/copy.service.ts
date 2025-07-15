import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'

/**
 * 拷贝漫画平台服务
 * 提供拷贝漫画平台的内容解析功能
 */
@Injectable()
export class CopyService {
  private readonly httpClient: AxiosInstance
  private readonly baseUrl = 'https://api.copy-manga.com'
  private readonly headers = {
    platform: 3,
    version: '2.2.5',
  }

  constructor() {
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      headers: this.headers,
      timeout: 10000,
    })
  }

  /**
   * 搜索漫画关键词
   * @param keyword 搜索关键词
   * @returns 搜索结果
   */
  async searchWord(keyword: string) {
    try {
      const { data } = await this.httpClient.get('/api/v3/search/comic', {
        params: {
          q: keyword,
          limit: 30,
          offset: 0,
        },
      })

      if (data.code !== 200) {
        return { code: 201 }
      }

      return {
        code: 200,
        data: data.results.list.map((item: any) => ({
          id: item.path_word,
          name: item.name,
          cover: item.cover,
          author: item.author.map((author: any) => ({
            name: author.name,
          })),
          source: '拷贝',
        })),
      }
    } catch (error) {
      return { code: 201 }
    }
  }

  /**
   * 解析漫画内容
   * @param id 漫画ID
   * @returns 漫画详情
   */
  async parseWord(id: string) {
    return await this.wordDetail(id)
  }

  /**
   * 获取漫画详情
   * @param path 漫画路径
   * @returns 漫画详情数据
   */
  async wordDetail(path: string) {
    try {
      const { data } = await this.httpClient.get(
        `/api/v3/comic2/${path}?in_mainland=true&platform=3`,
      )
      return data.code !== 200
        ? { code: 201 }
        : { code: 200, data: data.results }
    } catch (error) {
      return { code: 201 }
    }
  }

  /**
   * 获取章节列表
   * @param path 漫画路径
   * @returns 章节列表
   */
  async chapterList(path: string) {
    try {
      const { data } = await this.httpClient.get(
        `/api/v3/comic/${path}/group/default/chapters?limit=500&offset=0&in_mainland=true&platform=3`,
      )
      return data.code !== 200
        ? { code: 201 }
        : { code: 200, data: data.results.list }
    } catch (error) {
      return { code: 201 }
    }
  }

  /**
   * 获取章节内容
   * @param path 漫画路径
   * @param chapterId 章节ID
   * @returns 章节内容
   */
  async chapterContent(path: string, chapterId: string) {
    try {
      const { data } = await this.httpClient.get(
        `/api/v3/comic/${path}/chapter2/${chapterId}?in_mainland=true&platform=3`,
      )
      return data.code !== 200
        ? { code: 201 }
        : { code: 200, data: data.results }
    } catch (error) {
      return { code: 201 }
    }
  }
}
