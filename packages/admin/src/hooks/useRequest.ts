import type { ResolvedReturnType } from '@akaiito/typings/src'
import type { IterateObject } from '@typings/index'

export const useRequest = <T extends Function>(
  api: T,
  params: IterateObject = {}
) => {
  const loading = ref(false)
  const requestData = ref<ResolvedReturnType<T>>()

  const pageParams = {
    pageIndex: 0,
    pageSize: 15,
    orderBy: {}
  }

  const requestParams = ref<IterateObject>({})

  const request = async <K>(p?: K) => {
    loading.value = true
    const options: IterateObject = {
      ...(p || {}),
      ...requestParams.value,
      ...params
    }

    if (Object.keys(requestParams.value.orderBy).length) {
      options.orderBy = JSON.stringify(requestParams.value.orderBy)
    }

    requestData.value = await api(options)
    loading.value = false
  }

  const pageRequest = async <K>(p?: K) => {
    if (!requestParams.value.pageSize) {
      requestParams.value.orderBy = {}
      requestParams.value.pageSize = pageParams.pageSize
      requestParams.value.pageIndex = 0
    } else {
      requestParams.value.pageIndex++
    }

    requestParams.value = {
      ...requestParams.value,
      ...(p || {})
    }
  }

  const resetPageRequest = async <K>(p?: K) => {
    requestParams.value = {
      pageIndex: 0,
      pageSize: 15,
      orderBy: {},
      ...p
    }
  }

  const sortChange = (val: IterateObject) => {
    requestParams.value.orderBy[val.field] = val.order
  }

  watch(requestParams, () => request(requestParams.value), { deep: true })

  return {
    loading,
    request,
    requestParams,
    requestData,
    pageRequest,
    sortChange,
    resetPageRequest
  }
}
