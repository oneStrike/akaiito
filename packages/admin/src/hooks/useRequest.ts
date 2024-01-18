import type { ResolvedReturnType } from '@akaiito/typings/src'
import type { IterateObject } from '@typings/index'

export const useRequest = <T extends Function>(
  api: T,
  params?: IterateObject
) => {
  const loading = ref(false)
  const requestData = ref<ResolvedReturnType<T>>()

  const requestParams = ref<IterateObject>({
    pageIndex: 0,
    pageSize: 15,
    orderBy: ''
  })

  const request = async <K>(p?: K) => {
    loading.value = true
    requestData.value = await api(Object.assign(p || {}, params || {}))
    loading.value = false
  }

  const pageRequest = async <K>(p?: K) => {
    await request({ ...p, ...requestParams.value })
    requestParams.value.pageIndex++
  }

  const resetPageRequest = async <K>(p?: K) => {
    requestParams.value = {
      pageIndex: 0,
      pageSize: 15,
      orderBy: ''
    }
  }

  watch(requestParams, () => request(requestParams.value), { deep: true })

  return {
    loading,
    request,
    requestParams,
    requestData,
    pageRequest,
    resetPageRequest
  }
}
