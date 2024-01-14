import type { ResolvedReturnType } from '@akaiito/typings/src'
import type { IterateObject } from '@typings/index'

export const useRequest = <T extends Function>(
  api: T,
  params?: IterateObject
) => {
  const loading = ref(false)
  const requestData = ref<ResolvedReturnType<T>>()

  const pageParams = ref({
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
    await request({ ...p, ...pageParams.value })
    pageParams.value.pageIndex++
  }

  const resetPageRequest = async <K>(p?: K) => {
    console.log(
      '🚀 ~ file:useRequest method:resetPageRequest line:29 -----',
      api
    )
    pageParams.value = {
      pageIndex: 0,
      pageSize: 15,
      orderBy: ''
    }
    await request({ ...p, ...pageParams.value })
  }

  return {
    loading,
    request,
    pageParams,
    requestData,
    pageRequest,
    resetPageRequest
  }
}
