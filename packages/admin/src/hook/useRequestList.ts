import type {
  ListParamsData,
  Sort,
  UseListData
} from '@/typings/hook/useRequestList'

export const useListData: UseListData = (options) => {
  const api = options.api
  const refreshHook = options.refreshHook
  const defaultListParams: ListParamsData = Object.assign(
    {
      pageIndex: 0,
      pageSize: 15,
      sort: '',
      sortField: ''
    },
    options.params ? JSON.parse(JSON.stringify(unref(options.params))) : {}
  )

  const listParams = useCloned(defaultListParams).cloned

  const loading = ref(false)
  const listData = ref<any[]>([])
  const total = ref<number>(0)

  //请求接口
  const runApi = async () => {
    loading.value = true
    let pageIndex = listParams.value.pageIndex || 0
    const res = await api({
      ...listParams.value,
      pageIndex: pageIndex++,
      ...useFormatDate(listParams.value.createdAt)
    })
    listData.value = res.list
    total.value = res.total
    loading.value = false
  }

  watch(listParams, runApi, {
    deep: true,
    immediate: true
  })

  //重置刷新
  const refresh = async () => {
    refreshHook()
    listParams.value = JSON.parse(JSON.stringify(defaultListParams))
  }

  //排序
  const sort: Sort = async (key, order) => {
    listParams.value.sortField = key
    let defaultSort = ''
    if (key === defaultListParams.sortField) {
      defaultSort = defaultListParams.sort ?? ''
    }
    listParams.value.sort = order
      ? order === 'ascend'
        ? 'asc'
        : 'desc'
      : defaultSort

    listParams.value.pageIndex = 0
  }

  return {
    runApi,
    refresh,
    sort,
    listData,
    loading,
    total,
    params: listParams
  }
}
