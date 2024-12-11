import { httpHandler } from '@/utils/request'
import type {
  GetComicContentPageTypesRes,
  UpsertComicContentTypesRes,
  UpsertComicContentTypesReq,
  DeleteComicContentTypesRes,
  DeleteComicContentTypesReq,
  OrderComicContentPageTypesRes,
  OrderComicContentPageTypesReq,
} from './types/content.d'

/**
 *  接口 [获取漫画内容分页](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243053782)
 *  @标签 内容/获取漫画内容分页
 *  @方式 GET
 *  @地址 /admin/comic/content/getComicContentPage
 *  @更新时间 2024-12-11 09:47:11
 */

export const getComicContentPageApi = (): Promise<GetComicContentPageTypesRes> => {
  return httpHandler({
    method: 'GET',
    url: '/admin/comic/content/getComicContentPage',
    headers: {},
  })
}

/**
 *  接口 [更新或创建漫画内容](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-243052051)
 *  @标签 内容/更新或创建漫画内容
 *  @方式 POST
 *  @地址 /admin/comic/content/upsertComicContent
 *  @更新时间 2024-12-11 09:33:31
 */

export const upsertComicContentApi = (data: UpsertComicContentTypesReq): Promise<UpsertComicContentTypesRes> => {
  return httpHandler({
    method: 'POST',
    url: '/admin/comic/content/upsertComicContent',
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
