import { httpHandler } from '@/utils/request'
import type {
  GetComicPageTypesRes,
  GetComicPageTypesReq,
  GetComicDetailTypesRes,
  GetComicDetailTypesReq,
  CreateComicTypesRes,
  CreateComicTypesReq,
  UpdateComicTypesRes,
  UpdateComicTypesReq,
  UpdateComicPublishTypesRes,
  UpdateComicPublishTypesReq,
  DeleteComicTypesRes,
  DeleteComicTypesReq,
} from './types/comic.d'

/**
 *  接口 [漫画分页数据](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-239558086)
 *  @标签 /漫画分页数据
 *  @方式 GET
 *  @地址 /admin/comic/getComicPage
 *  @更新时间 2024-12-01 13:21:10
 */

export const getComicPageApi = (params: GetComicPageTypesReq): Promise<GetComicPageTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/comic/getComicPage',
    headers: {},
    params,
  })
}

/**
 *  接口 [获取漫画详情](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-239560818)
 *  @标签 /获取漫画详情
 *  @方式 GET
 *  @地址 /admin/comic/getComicDetail
 *  @更新时间 2024-12-01 01:37:45
 */

export const getComicDetailApi = (params: GetComicDetailTypesReq): Promise<GetComicDetailTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/comic/getComicDetail',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建漫画](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-239514784)
 *  @标签 /创建漫画
 *  @方式 POST
 *  @地址 /admin/comic/createComic
 *  @更新时间 2024-12-02 13:38:21
 */

export const createComicApi = (data: CreateComicTypesReq): Promise<CreateComicTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/createComic',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新漫画](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-239783870)
 *  @标签 /更新漫画
 *  @方式 POST
 *  @地址 /admin/comic/updateComic
 *  @更新时间 2024-12-02 13:38:21
 */

export const updateComicApi = (data: UpdateComicTypesReq): Promise<UpdateComicTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/updateComic',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [上架或下架](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-240038799)
 *  @标签 /上架或下架
 *  @方式 POST
 *  @地址 /admin/comic/updateComicPublish
 *  @更新时间 2024-12-02 19:17:04
 */

export const updateComicPublishApi = (data: UpdateComicPublishTypesReq): Promise<UpdateComicPublishTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/updateComicPublish',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除漫画](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-240039189)
 *  @标签 /删除漫画
 *  @方式 POST
 *  @地址 /admin/comic/deleteComic
 *  @更新时间 2024-12-02 19:18:36
 */

export const deleteComicApi = (data: DeleteComicTypesReq): Promise<DeleteComicTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/deleteComic',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
