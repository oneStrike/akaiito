import { httpHandler } from '@/utils/request'
import type {
  GetComicContentPageTypesRes,
  GetComicContentPageTypesReq,
  CreateComicContentTypesRes,
  CreateComicContentTypesReq,
  DeleteComicContentTypesRes,
  DeleteComicContentTypesReq,
  OrderComicContentPageTypesRes,
  OrderComicContentPageTypesReq,
  RemoveComicContentTypesRes,
  RemoveComicContentTypesReq,
} from './types/content.d'

/**
 *  接口 [获取漫画内容分页](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243053782)
 *  @标签 内容/获取漫画内容分页
 *  @方式 GET
 *  @地址 /admin/comic/content/getComicContentPage
 *  @更新时间 2025-04-28 00:08:47
 */

export const getComicContentPageApi = (params: GetComicContentPageTypesReq): Promise<GetComicContentPageTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/comic/content/getComicContentPage',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建漫画内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243052051)
 *  @标签 内容/创建漫画内容
 *  @方式 POST
 *  @地址 /admin/comic/content/createComicContent
 *  @更新时间 2025-04-27 22:58:26
 */

export const createComicContentApi = (data: CreateComicContentTypesReq): Promise<CreateComicContentTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/content/createComicContent',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除漫画内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243052599)
 *  @标签 内容/删除漫画内容
 *  @方式 POST
 *  @地址 /admin/comic/content/deleteComicContent
 *  @更新时间 2024-12-11 09:34:19
 */

export const deleteComicContentApi = (data: DeleteComicContentTypesReq): Promise<DeleteComicContentTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/content/deleteComicContent',
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
 *  @地址 /admin/comic/content/orderComicContentPage
 *  @更新时间 2024-12-11 09:35:16
 */

export const orderComicContentPageApi = (
  data: OrderComicContentPageTypesReq,
): Promise<OrderComicContentPageTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/content/orderComicContentPage',
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
 *  @地址 /admin/comic/content/removeComicContent
 *  @更新时间 2024-12-16 09:47:07
 */

export const removeComicContentApi = (data: RemoveComicContentTypesReq): Promise<RemoveComicContentTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/content/removeComicContent',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
