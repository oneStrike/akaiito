import type { ListParams } from '@/typings/components/base/baseTable'
import type { Ref } from 'vue'

export type ListParamsData = Record<string | symbol, any> & ListParams
export interface UseListDataParams {
  params?: ListParamsData
  api: (params: any) => Promise<any>
}

export type RunApi = () => Promise<void>
export type UserListData = (options: UseListDataParams) => {
  runApi: RunApi
  reset: () => Promise<void>
  listData: Ref<any[]>
  loading: Ref<boolean>
  params: Ref<ListParamsData>
  total: Ref<number>
  currentPageIndex: number
}
