import { httpClient } from '@/utils/request'

/**
 *  接口 [漫画详情]
 * @param path
 */
export const getMangaDetailApi = (path: string): Promise<any> => {
  return httpClient({
    method: 'GET',
    url: `/api/v3/comic2/${path}`,
    data: { in_mainland: true },
  })
}

/**
 *  接口 [用户和漫画关联情况]
 * @param path
 */
export const getMangaRelationApi = (path: string): Promise<any> => {
  return httpClient({
    method: 'GET',
    url: `/api/v3/comic2/${path}/query`,
  })
}

/**
 *  接口 [漫画章节列表]
 * @param path
 */
export const getMangaChaptersApi = (path: string): Promise<any> => {
  return httpClient({
    method: 'GET',
    url: `/api/v3/comic/${path}/group/default/chapters`,
    data: {
      in_mainland: true,
      limit: 500,
      offset: 0,
    },
    header: {
      platform: 3,
      version: '2.2.5',
    },
  })
}

/**
 *  接口 [漫画章节列表]
 * @param path
 * @param chapters
 */
export const getMangaChaptersContentApi = (
  path: string,
  chapters: string,
): Promise<any> => {
  return httpClient({
    method: 'GET',
    url: `/api/v3/comic/${path}/chapter2/${chapters}`,
    data: {
      in_mainland: true,
    },
  })
}
