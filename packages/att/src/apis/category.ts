import { httpClient } from '@/utils/request'
import type { GetCategoryListTypings } from './category.d'

export const getCategoryListApi = (
  params?: GetCategoryListTypings['Request'],
): Promise<GetCategoryListTypings['Response']> => {
  return httpClient({
    method: 'GET',
    url: '/admin/contentMgmt/category/getCategoryList',
    params,
  })
}
