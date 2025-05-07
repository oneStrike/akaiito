import { httpHandler } from '@/utils/request'
import type {
  GetChapterTypesRes,
  GetChapterTypesReq,
  CreateChapterTypesRes,
  CreateChapterTypesReq,
  UpdateChapterTypesRes,
  UpdateChapterTypesReq,
  UpdateChapterPublishTypesRes,
  UpdateChapterPublishTypesReq,
  DeleteChapterTypesRes,
  DeleteChapterTypesReq,
  UpdateChapterOrderTypesRes,
  UpdateChapterOrderTypesReq,
} from './types/chapter.d'

/**
 *  接口 [获取章节列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242072801)
 *  @标签 漫画/章节/获取章节列表
 *  @方式 GET
 *  @地址 /admin/comic/chapter/getChapter
 *  @更新时间 2025-05-07 17:30:30
 */

export const getChapterApi = (params: GetChapterTypesReq): Promise<GetChapterTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/comic/chapter/getChapter',
    headers: {},
    params,
  })
}

/**
 *  接口 [添加作品章节](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242070794)
 *  @标签 漫画/章节/添加作品章节
 *  @方式 POST
 *  @地址 /admin/chapter/createChapter
 *  @更新时间 2024-12-08 16:14:29
 */

export const createChapterApi = (data: CreateChapterTypesReq): Promise<CreateChapterTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/chapter/createChapter',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新章节](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242073428)
 *  @标签 漫画/章节/更新章节
 *  @方式 POST
 *  @地址 /admin/chapter/updateChapter
 *  @更新时间 2024-12-08 16:40:25
 */

export const updateChapterApi = (data: UpdateChapterTypesReq): Promise<UpdateChapterTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/chapter/updateChapter',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新作品发布状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242074231)
 *  @标签 漫画/章节/更新作品发布状态
 *  @方式 POST
 *  @地址 /admin/chapter/updateChapterPublish
 *  @更新时间 2024-12-08 16:52:45
 */

export const updateChapterPublishApi = (data: UpdateChapterPublishTypesReq): Promise<UpdateChapterPublishTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/chapter/updateChapterPublish',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除章节](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242074973)
 *  @标签 漫画/章节/删除章节
 *  @方式 POST
 *  @地址 /admin/chapter/deleteChapter
 *  @更新时间 2024-12-08 17:03:50
 */

export const deleteChapterApi = (data: DeleteChapterTypesReq): Promise<DeleteChapterTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/chapter/deleteChapter',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [调整章节排序](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242075018)
 *  @标签 漫画/章节/调整章节排序
 *  @方式 POST
 *  @地址 /admin/chapter/updateChapterOrder
 *  @更新时间 2024-12-08 17:05:45
 */

export const updateChapterOrderApi = (data: UpdateChapterOrderTypesReq): Promise<UpdateChapterOrderTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/chapter/updateChapterOrder',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
