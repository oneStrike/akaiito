import type { IterateObject, ResolvedReturnType } from '@akaiito/typings/src'

export const useRequest = <T extends Function>(
  api: T,
  defaultParams: IterateObject = {},
  init: boolean | 'page' | 'normal' = true
) => {
  const loading = ref(false) // 表示请求的加载状态
  const requestRes = ref<ResolvedReturnType<T>>() // 存储请求返回的数据
  const params = ref<IterateObject>(defaultParams) //请求参数
  //默认的分页请求参数
  const pageParams = {
    pageIndex: 0,
    pageSize: 15
  }

  const request = async <K>(p?: K) => {
    loading.value = true
    params.value = { ...params.value, ...(p || {}) }
    requestRes.value = await api(params.value) // 执行请求
    loading.value = false
  }

  /**
   * 执行分页请求的函数，支持传入额外参数。
   * @param p 额外的请求参数，可选。
   */
  const requestPage = async <K>(p?: K) => {
    params.value = { ...(p || {}), ...params.value }
    if (typeof params.value.pageIndex === 'number') {
      params.value.pageIndex++
    } else {
      params.value = { ...pageParams, ...params.value }
    }

    return await request(params.value)
  }

  /**
   * 重置请求参数到默认状态，支持传入新的参数。
   * @param p 新的请求参数，可选。
   */
  const reset = async <K>(p?: K) => {
    params.value = { ...defaultParams, ...(p || {}) }
    return await request(p)
  }

  /**
   * 重置分页参数到默认状态，支持传入新的参数。
   * @param p 新的分页参数，可选。
   */
  const resetPage = async <K>(p?: K) => {
    params.value = {
      // 根据默认参数、当前参数和新参数进行重置
      ...pageParams,
      ...(p || {})
    }
    return await request(p)
  }

  if (init === 'normal' || init === true) {
    request()
  } else if (init === 'page') {
    requestPage()
  }

  return {
    // 返回各种方法和状态
    reset,
    params,
    loading,
    request,
    resetPage,
    requestPage,
    requestRes
  }
}
