import type { ResolvedReturnType } from '@akaiito/typings/src'
import type { IterateObject } from '@typings/index'

/**
 * useRequest 是一个高阶函数，用于封装 API 请求，提供加载状态、请求参数配置及排序等功能。
 * @param api 一个函数，代表需要被封装的 API 请求。
 * @param params 默认请求参数，可选。
 * @returns 返回一个对象，包含加载状态、请求方法、重置方法、排序改变方法及请求数据等属性。
 */
export const useRequest = <T extends Function>(
  api: T,
  params: IterateObject = {}
) => {
  const loading = ref(false) // 表示请求的加载状态
  const requestData = ref<ResolvedReturnType<T>>() // 存储请求返回的数据

  const defaultPageParams = {
    // 默认的分页参数
    pageIndex: 0,
    pageSize: 15,
    orderBy: {}
  }

  const requestParams = ref<IterateObject>({}) // 存储请求时的额外参数配置

  /**
   * 执行请求的函数，支持传入额外参数。
   * @param p 额外的请求参数，可选。
   */
  const request = async <K>(p?: K) => {
    loading.value = true
    const options: IterateObject = {
      // 组合所有的请求参数
      ...(p || {}),
      ...requestParams.value,
      ...params
    }

    // 如果有排序参数，则将其转换为字符串
    if (Object.keys(requestParams.value.orderBy).length) {
      options.orderBy = JSON.stringify(requestParams.value.orderBy)
    }

    requestData.value = await api(options) // 执行请求
    loading.value = false
  }

  /**
   * 执行分页请求的函数，支持传入额外参数。
   * @param p 额外的请求参数，可选。
   */
  const requestPage = async <K>(p?: K) => {
    // 计算新的分页参数
    const page: IterateObject =
      typeof requestParams.value.pageIndex === 'number'
        ? { pageIndex: requestParams.value.pageIndex + 1 }
        : { ...defaultPageParams }

    requestParams.value = {
      // 更新请求参数
      ...page,
      ...(p || {})
    }
    ignorePrevAsyncUpdates() // 忽略之前的异步更新
    return await request(p)
  }

  /**
   * 重置请求参数到默认状态，支持传入新的参数。
   * @param p 新的请求参数，可选。
   */
  const resetRequest = async <K>(p?: K) => {
    requestParams.value = requestParams.value.pageSize
      ? {
          // 如果存在页面大小参数，则基于默认参数和新参数进行重置
          ...defaultPageParams,
          ...p
        }
      : { ...p } // 否则直接使用新参数
    ignorePrevAsyncUpdates()
    return await request(p)
  }

  /**
   * 重置分页参数到默认状态，支持传入新的参数。
   * @param p 新的分页参数，可选。
   */
  const resetPage = async <K>(p?: K) => {
    requestParams.value = {
      // 根据默认参数、当前参数和新参数进行重置
      ...requestParams.value,
      ...defaultPageParams,
      ...p
    }
    ignorePrevAsyncUpdates()
    return await request(p)
  }

  /**
   * 排序方式改变时的处理函数。
   * @param val 包含字段和排序顺序的对象。
   */
  const sortChange = (val: IterateObject) => {
    requestParams.value.orderBy[val.field] = val.order // 更新排序参数
  }

  // 监听请求参数的变化，并在变化时执行请求
  const { ignorePrevAsyncUpdates } = watchIgnorable(
    requestParams,
    (val) => {
      request(val)
    },
    { deep: true }
  )

  return {
    // 返回各种方法和状态
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
