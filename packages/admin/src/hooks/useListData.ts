import type { ListParams } from '@/typings/components/base/baseTable'
import type { ListParamsData, UserListData } from '@/typings/hooks/useListData'

export const useListData: UserListData = (options) => {
  const api = options.api
  const defaultListParams = {
    pageIndex: 0,
    pageSize: 15,
    sort: '',
    sortField: ''
  }

  const listParams = ref<ListParamsData>(
    Object.assign(defaultListParams, options.params || {})
  )

  const loading = ref(false)
  const listData = ref<any[]>([])
  const total = ref<number>(0)

  const runApi = async () => {
    loading.value = true
    const res = await api({
      ...listParams.value,
      pageIndex: listParams.value.pageIndex!++
    })
    console.log('🚀 ~ file:useListData method:runApi line:27 -----', res)
    listData.value = res.list
    total.value = res.total
    loading.value = false
  }

  const reset = async () => {
    listParams.value = Object.assign(defaultListParams, options.params || {})
    await runApi()
  }

  return {
    runApi,
    reset,
    listData,
    loading,
    params: listParams,
    total,
    currentPageIndex: listParams.value.pageIndex!
  }
}
