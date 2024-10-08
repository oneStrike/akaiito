import { utils } from '@/utils'
import type { AsyncFn, ResolvedReturnType } from '@akaiito/typings/src'
import type { IterateObject } from '@typings/index'

interface RequestOptions {
  init?: boolean
  params?: IterateObject | globalThis.Ref<IterateObject>
  type?: 'page' | 'list'
  defaultParams?: IterateObject
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
  let {
    type = 'page',
    params = ref<ResolvedReturnType<T>>(),
    defaultParams = {},
    init = true,
  } = options || {}
  const defaultPageParams = {
    // 默认的分页参数
    pageIndex: 0,
    pageSize: 15,
    orderBy: {},
  }

  let skipNext = false
  const loading = ref(false) // 表示请求的加载状态
  const requestData = ref<ResolvedReturnType<T>>() // 存储请求返回的数据

  if (!isRef(params)) {
    params = ref<IterateObject>(params)
  }
  if (Object.keys(defaultParams)) {
    params.value = { ...params.value, ...defaultParams }
  }

  if (type === 'page') {
    params.value.pageSize = defaultPageParams.pageSize
    params.value.pageIndex = defaultPageParams.pageIndex
  }

  if (!params.value.orderBy) {
    params.value.orderBy = {}
  }

  /**
   * 执行请求的函数，支持传入额外参数。
   * @param p 额外的请求参数，可选。
   */
  const request = async <K>(p?: K) => {
    console.log(p)
    loading.value = true
    skipNext = true
    if (p) {
      params.value = { ...params.value, ...p }
    }

    if (type === 'page') {
      params.value.pageIndex = params.value.pageIndex++
    }

    const options: IterateObject = utils._.cloneDeep(params.value)

    // 如果有排序参数，则将其转换为字符串
    if (options.orderBy && Object.keys(options.orderBy).length) {
      options.orderBy = JSON.stringify(params.value.orderBy)
    }

    try {
      requestData.value = await api(options) // 执行请求
    } catch (e) {
      console.log(e)
    }
    loading.value = false
    skipNext = false
  }

  const reset = async <K>(p?: K) => {
    skipNext = true
    params.value = utils._.cloneDeep(defaultParams)
    if (!params.value.orderBy) {
      params.value.orderBy = {}
    }
    if (type === 'page') {
      params.value.pageIndex = defaultPageParams.pageIndex
      params.value.pageSize = defaultPageParams.pageSize
    }
    if (p) {
      params.value = { ...params.value, ...p }
    }

    return await request()
  }

  if (init) {
    request()
  }

  watch(
    params,
    () => {
      if (skipNext) {
        return
      }
      request()
    },
    { deep: true },
  )

  /**
   * 排序方式改变时的处理函数。
   * @param val 包含字段和排序顺序的对象。
   */
  const sortChange = (val: IterateObject) => {
    params.value.orderBy[val.field] = val.order // 更新排序参数
  }

  return {
    // 返回各种方法和状态
    reset,
    params: params as globalThis.Ref<IterateObject>,
    loading,
    request,
    sortChange,
    requestData,
  }
}
