import { httpClient } from '@/utils/request'
import type {
  GetAuthorPageTypesRes,
  GetAuthorPageTypesReq,
  CreateAuthorTypesRes,
  CreateAuthorTypesReq,
  UpdateAuthorTypesRes,
  UpdateAuthorTypesReq,
  DeleteAuthorTypesRes,
  DeleteAuthorTypesReq,
  UpdateAuthorStatusTypesRes,
  UpdateAuthorStatusTypesReq,
} from './types/author.d'

/**
 *  接口 [作者分页列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215698093)
 *  @标签 内容管理/作者管理/作者分页列表
 *  @方式 GET
 *  @地址 /admin/contentMgmt/author/getAuthorPage
 *  @更新时间 2024-09-16 22:23:08
 */

export const getAuthorPageApi = (params: GetAuthorPageTypesReq): Promise<GetAuthorPageTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/contentMgmt/author/getAuthorPage',
    headers: {},
    params,
  })
}

/**
 *  接口 [创建作者](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-214490409)
 *  @标签 内容管理/作者管理/创建作者
 *  @方式 POST
 *  @地址 /admin/contentMgmt/author/createAuthor
 *  @更新时间 2024-09-18 00:33:57
 */

export const createAuthorApi = (data: CreateAuthorTypesReq): Promise<CreateAuthorTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/author/createAuthor',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新作者信息](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-214498981)
 *  @标签 内容管理/作者管理/更新作者信息
 *  @方式 POST
 *  @地址 /admin/contentMgmt/author/updateAuthor
 *  @更新时间 2024-09-17 23:13:32
 */

export const updateAuthorApi = (data: UpdateAuthorTypesReq): Promise<UpdateAuthorTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/author/updateAuthor',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [删除作者](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215740463)
 *  @标签 内容管理/作者管理/删除作者
 *  @方式 POST
 *  @地址 /admin/contentMgmt/author/deleteAuthor
 *  @更新时间 2024-09-16 22:23:28
 */

export const deleteAuthorApi = (data: DeleteAuthorTypesReq): Promise<DeleteAuthorTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/author/deleteAuthor',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

/**
 *  接口 [更新作者状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215740509)
 *  @标签 内容管理/作者管理/更新作者状态
 *  @方式 POST
 *  @地址 /admin/contentMgmt/author/updateAuthorStatus
 *  @更新时间 2024-09-16 22:23:34
 */

export const updateAuthorStatusApi = (data: UpdateAuthorStatusTypesReq): Promise<UpdateAuthorStatusTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/author/updateAuthorStatus',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}
