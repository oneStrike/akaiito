import { httpClient } from '@/utils/request'
import type { GetCategoryListTypesRes, GetCategoryListTypesReq } from './types/category.d'

/**
 *  接口 [获取分类列表](https://apifox.com/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-215788540)
 *  @标签 分类管理/获取分类列表
 *  @方式 GET
 *  @地址 /admin/contentMgmt/category/getCategoryList
 *  @更新时间 2024-09-17 22:38:02
 */

export const getCategoryListApi = (params: GetCategoryListTypesReq): Promise<GetCategoryListTypesRes> => {
  return httpClient({
    method: 'GET',
    url: '/admin/contentMgmt/category/getCategoryList',
    params,
  })
}
