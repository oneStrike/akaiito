import type { Ref } from 'vue'

export interface ListParams {
  pageSize?: number
  pageIndex?: number
  sort?: string | ''
  sortField?: string | ''
}

export type ListParamsData = Record<string | symbol, any> & ListParams
export interface UseListDataParams {
  params?: ListParamsData
  api: (params: any) => Promise<any>
  refreshHook?: () => Promise<any> | any
}

export type RunApi = () => Promise<void>

export type Sort = (
  key: string,
  order: 'ascend' | 'descend' | false
) => Promise<void>

export type UseListData = (options: UseListDataParams) => {
  runApi: RunApi
  refresh: () => Promise<void>
  sort: Sort
  listData: Ref<any[]>
  loading: Ref<boolean>
  params: Ref<ListParamsData>
  total: Ref<number>
}
