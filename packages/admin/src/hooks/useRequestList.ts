import type { ListParamsData, UseListData } from '@/typings/hook/useRequestList'
import { utils } from '@/utils'
import type { Ref } from 'vue'

export const useListData: UseListData = (options) => {
  const api = options.api
  const refreshHook = options.refreshHook

  const basicParams = {
    pageIndex: 0,
    pageSize: 15,
    sort: '',
    sortField: ''
  }

  const initialParams = utils._.cloneDeep(options.params)

  const listParams = ref()

  const loading = ref(false)
  const listData = ref<any[]>([])
  const total = ref<number>(0)

  //请求接口
  const runApi = async (reset = false) => {
    loading.value = true
    listParams.value = getParams(options.params, reset)
    const res = await api(listParams.value)
    options.data.value = res.list
    total.value = res.total
    loading.value = false
  }

  const getParams = (
    val?: ListParamsData | Ref<ListParamsData>,
    reset = false
  ) => {
    if (!val) return basicParams
    if (reset) return initialParams
    if (isRef(val)) val = val.value
    const dateParams = val.createdAt ? useFormatDate(val.createdAt) : {}
    delete val.createdAt
    const params = {
      ...dateParams,
      ...Object.assign(utils._.cloneDeep(basicParams), val)
    }
    if (params.sort) {
      params.sort = params.sort === 'ascend' ? 'asc' : 'desc'
    } else {
      params.sort = 'asc'
    }
    return params
  }

  watch(
    () => options.params,
    () => {
      runApi()
    },
    { deep: true, immediate: true }
  )

  //重置刷新
  const refresh = async () => {
    refreshHook && refreshHook()
    await runApi(true)
  }

  return {
    runApi,
    refresh,
    listData,
    loading,
    total,
    params: listParams
  }
}
