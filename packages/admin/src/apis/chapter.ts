import { httpHandler } from '@/utils/request'
import type {
  GetChapterTypesRes,
  GetChapterTypesReq,
  GetChapterPageTypesRes,
  GetChapterPageTypesReq,
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
  GetComicChapterContentTypesRes,
  GetComicChapterContentTypesReq,
  CreateComicChapterContentTypesRes,
  CreateComicChapterContentTypesReq,
  DeleteComicChapterContentTypesRes,
  DeleteComicChapterContentTypesReq,
  UpdateComicChapterContentOrderTypesRes,
  UpdateComicChapterContentOrderTypesReq,
  ClearComicChapterContentTypesRes,
  ClearComicChapterContentTypesReq,
} from './types/chapter.d'

/**
 *  接口 [获取章节详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242072801)
 *  @标签 漫画/章节/获取章节详情
 *  @方式 GET
 *  @地址 /admin/comic/chapter/getChapter
 *  @更新时间 2025-05-10 19:01:03
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
 *  接口 [获取章节分页数据](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-294162257)
 *  @标签 漫画/章节/获取章节分页数据
 *  @方式 GET
 *  @地址 /admin/comic/chapter/getChapterPage
 *  @更新时间 2025-05-10 19:00:48
 */

export const getChapterPageApi = (params: GetChapterPageTypesReq): Promise<GetChapterPageTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/comic/chapter/getChapterPage',
    headers: {},
    params,
  })
}

/**
 *  接口 [添加作品章节](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-242070794)
 *  @标签 漫画/章节/添加作品章节
 *  @方式 POST
 *  @地址 /admin/comic/chapter/createChapter
 *  @更新时间 2025-05-10 01:06:35
 */

export const createChapterApi = (data: CreateChapterTypesReq): Promise<CreateChapterTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/chapter/createChapter',
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
 *  @地址 /admin/comic/chapter/updateChapter
 *  @更新时间 2025-05-10 01:06:42
 */

export const updateChapterApi = (data: UpdateChapterTypesReq): Promise<UpdateChapterTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/chapter/updateChapter',
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
 *  @地址 /admin/comic/chapter/updateChapterPublish
 *  @更新时间 2025-05-10 01:06:49
 */

export const updateChapterPublishApi = (data: UpdateChapterPublishTypesReq): Promise<UpdateChapterPublishTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/chapter/updateChapterPublish',
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
 *  @地址 /admin/comic/chapter/deleteChapter
 *  @更新时间 2025-05-10 01:06:55
 */

export const deleteChapterApi = (data: DeleteChapterTypesReq): Promise<DeleteChapterTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/chapter/deleteChapter',
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
 *  @地址 /admin/comic/chapter/updateChapterOrder
 *  @更新时间 2025-05-10 01:07:03
 */

export const updateChapterOrderApi = (data: UpdateChapterOrderTypesReq): Promise<UpdateChapterOrderTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/chapter/updateChapterOrder',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [获取漫画内容分页](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243053782)
 *  @标签 内容/获取漫画内容分页
 *  @方式 GET
 *  @地址 /admin/comic/chapter/getComicChapterContent
 *  @更新时间 2025-05-25 22:19:25
 */

export const getComicChapterContentApi = (
  params: GetComicChapterContentTypesReq,
): Promise<GetComicChapterContentTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/comic/chapter/getComicChapterContent',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建漫画内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243052051)
 *  @标签 内容/创建漫画内容
 *  @方式 POST
 *  @地址 /admin/comic/chapter/createComicChapterContent
 *  @更新时间 2025-05-25 22:38:45
 */

export const createComicChapterContentApi = (
  data: CreateComicChapterContentTypesReq,
): Promise<CreateComicChapterContentTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/chapter/createComicChapterContent',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  })
}

/**
 *  接口 [删除漫画内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243052599)
 *  @标签 内容/删除漫画内容
 *  @方式 POST
 *  @地址 /admin/comic/chapter/deleteComicChapterContent
 *  @更新时间 2025-05-25 22:30:36
 */

export const deleteComicChapterContentApi = (
  data: DeleteComicChapterContentTypesReq,
): Promise<DeleteComicChapterContentTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/chapter/deleteComicChapterContent',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [漫画内容排序](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243053439)
 *  @标签 内容/漫画内容排序
 *  @方式 POST
 *  @地址 /admin/comic/chapter/updateComicChapterContentOrder
 *  @更新时间 2025-05-25 22:33:40
 */

export const updateComicChapterContentOrderApi = (
  data: UpdateComicChapterContentOrderTypesReq,
): Promise<UpdateComicChapterContentOrderTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/chapter/updateComicChapterContentOrder',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [清空章节内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243396531)
 *  @标签 内容/清空章节内容
 *  @方式 POST
 *  @地址 /admin/comic/chapter/clearComicChapterContent
 *  @更新时间 2025-05-25 22:31:12
 */

export const clearComicChapterContentApi = (
  data: ClearComicChapterContentTypesReq,
): Promise<ClearComicChapterContentTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/chapter/clearComicChapterContent',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
