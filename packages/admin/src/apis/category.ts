import { httpClient } from '@/utils/request'
import type {
  GetCategoryPageTypesRes,
  GetCategoryPageTypesReq,
  CreateCategoryTypesRes,
  CreateCategoryTypesReq,
  UpdateCategoryTypesRes,
  UpdateCategoryTypesReq,
  UpdateCategoryStatusTypesRes,
  UpdateCategoryStatusTypesReq,
  DeleteCategoryTypesRes,
  DeleteCategoryTypesReq,
} from './types/category.d'

/**
 *  接口 [获取内容分类分页](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215788540)
 *  @标签 分类管理/获取内容分类分页
 *  @方式 GET
 *  @地址 /admin/contentMgmt/category/getCategoryPage
 *  @更新时间 2024-10-10 00:47:39
 */

export const getCategoryPageApi = (params: GetCategoryPageTypesReq): Promise<GetCategoryPageTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/contentMgmt/category/getCategoryPage',
    params,
  })
}

/**
 *  接口 [创建内容分类](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-220368708)
 *  @标签 分类管理/创建内容分类
 *  @方式 POST
 *  @地址 /admin/contentMgmt/category/createCategory
 *  @更新时间 2024-10-07 10:44:25
 */

export const createCategoryApi = (data: CreateCategoryTypesReq): Promise<CreateCategoryTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/category/createCategory',
    data,
  })
}

/**
 *  接口 [更新分类接口](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-220372206)
 *  @标签 分类管理/更新分类接口
 *  @方式 POST
 *  @地址 /admin/contentMgmt/category/updateCategory
 *  @更新时间 2024-10-07 11:30:01
 */

export const updateCategoryApi = (data: UpdateCategoryTypesReq): Promise<UpdateCategoryTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/category/updateCategory',
    data,
  })
}

/**
 *  接口 [更新分类状态](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-220372569)
 *  @标签 分类管理/更新分类状态
 *  @方式 POST
 *  @地址 /admin/contentMgmt/category/updateCategoryStatus
 *  @更新时间 2024-10-07 11:41:35
 */

export const updateCategoryStatusApi = (data: UpdateCategoryStatusTypesReq): Promise<UpdateCategoryStatusTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/category/updateCategoryStatus',
    data,
  })
}

/**
 *  接口 [删除分类](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-220372611)
 *  @标签 分类管理/删除分类
 *  @方式 POST
 *  @地址 /admin/contentMgmt/category/deleteCategory
 *  @更新时间 2024-10-07 11:43:30
 */

export const deleteCategoryApi = (data: DeleteCategoryTypesReq): Promise<DeleteCategoryTypesRes> => {
  return httpClient({
    method: 'POST',
    url: '/admin/contentMgmt/category/deleteCategory',
    data,
  })
}
