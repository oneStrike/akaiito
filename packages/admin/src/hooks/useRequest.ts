import { utils } from '@/utils'
import type { AsyncFn, ResolvedReturnType } from '@akaiito/typings/src'
import type { IterateObject } from '@typings/index'

interface RequestOptions {
  init?: boolean
  params?: IterateObject
  defaultParams?: {
    pageIndex?: number
    pageSize?: number
    orderBy?: IterateObject
  } & IterateObject
}

/**
 * useRequest 是一个高阶函数，用于封装 API 请求，提供加载状态、请求参数配置及排序等功能。
 * @param api 一个函数，代表需要被封装的 API 请求。
 * @param options
 * @returns 返回一个对象，包含加载状态、请求方法、重置方法、排序改变方法及请求数据等属性。
 */
export function useRequest<T extends AsyncFn>(
  api: T,
  options?: RequestOptions,
) {
  const { params = {}, defaultParams = {}, init = true } = options || {}

  const loading = ref(false) // 表示请求的加载状态
  const requestData = ref<ResolvedReturnType<T>>() // 存储请求返回的数据
  const requestParams = ref<IterateObject>({ ...params, ...defaultParams }) // 存储请求时的额外参数配置

  const defaultPageParams = {
    // 默认的分页参数
    pageIndex: 0,
    pageSize: 15,
    orderBy: {},
    ...defaultParams,
  }

  let skipNext = false

  /**
   * 执行请求的函数，支持传入额外参数。
   * @param p 额外的请求参数，可选。
   */
  const request = async <K>(p?: K) => {
    loading.value = true
    if (p) {
      skipNext = true
      requestParams.value = { ...requestParams.value, ...p }
    }
    const options: IterateObject = utils._.cloneDeep(requestParams.value)

    // 如果有排序参数，则将其转换为字符串
    if (options.orderBy && Object.keys(options.orderBy).length) {
      options.orderBy = JSON.stringify(requestParams.value.orderBy)
    }

    try {
      requestData.value = await api(options) // 执行请求
    } catch (e) {
      console.log(e)
    }
    loading.value = false
  }

  if (init) {
    request()
  }

  watch(
    requestParams,
    () => {
      if (skipNext) {
        skipNext = false
        return
      }
      request()
    },
    { deep: true },
  )

  /**
   * 执行分页请求的函数，支持传入额外参数。
   * @param p 额外的请求参数，可选。
   */
  const requestPage = async <K>(p?: K) => {
    const { pageIndex } = requestParams.value
    let params: IterateObject = p || {}
    if (typeof pageIndex === 'number') {
      params.pageIndex = pageIndex + 1
    } else {
      params = Object.assign(params, defaultPageParams)
    }

    return await request(params)
  }

  /**
   * 重置分页参数到默认状态，支持传入新的参数。
   * @param p 新的分页参数，可选。
   */
  const resetPage = async <K>(p?: K) => {
    if (p) {
      skipNext = true
      requestParams.value = { ...defaultPageParams, ...p }
    }

    return await request()
  }

  /**
   * 排序方式改变时的处理函数。
   * @param val 包含字段和排序顺序的对象。
   */
  const sortChange = (val: IterateObject) => {
    requestParams.value.orderBy[val.field] = val.order // 更新排序参数
  }

  return {
    // 返回各种方法和状态
    loading,
    request,
    resetPage,
    sortChange,
    requestPage,
    requestData,
    requestParams,
  }
}
