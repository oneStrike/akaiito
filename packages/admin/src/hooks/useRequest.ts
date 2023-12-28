import type { ResolvedReturnType } from '@akaiito/typings/src'

export const useRequest = <T extends Function>(api: T) => {
  const loading = ref(false)
  const requestData = ref<ResolvedReturnType<T>>()

  const pageParams = ref({
    pageIndex: 0,
    pageSize: 15,
    orderBy: ''
  })

  const request = async <K>(p?: K) => {
    loading.value = true
    requestData.value = await api(p)
    loading.value = false
  }

  const pageRequest = async <K>(p?: K) => {
    await request({ ...p, ...pageParams.value })
    pageParams.value.pageIndex++
  }

  const resetPageRequest = async <K>(p?: K) => {
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
