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

  const requestPage = async <K>(p?: K) => {
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

  const resetRequest = async <K>(p?: K) => {
    console.log('🚀 ~ file:useRequest method:resetRequest line:51 -----', p)
    requestParams.value = requestParams.value.pageSize
      ? {
          ...pageParams,
          ...p
        }
      : { ...p }
  }

  const resetPage = async <K>(p?: K) => {
    requestParams.value = {
      ...requestParams.value,
      ...pageParams,
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
    resetPage,
    sortChange,
    requestPage,
    requestData,
    resetRequest,
    requestParams
  }
}
