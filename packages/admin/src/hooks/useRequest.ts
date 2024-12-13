import { utils } from '@/utils'

interface RequestOptions<T> {
  init?: boolean
  params?: IterateObject | globalThis.Ref<IterateObject>
  defaultParams?: IterateObject
  hook?: (data: ResolvedReturnType<T>) => ResolvedReturnType<T>
}

export function useRequest<T extends AsyncFn>(api: T, options?: RequestOptions<T>) {
  let { params = ref<ResolvedReturnType<T>>(), defaultParams = {}, init = true, hook } = options || {}
  defaultParams = Object.assign(
    {
      pageIndex: 0,
      pageSize: 15,
      orderBy: {},
    },
    defaultParams,
  )
  let skipNext = false
  const loading = ref(false) // 表示请求的加载状态
  const requestData = shallowRef<ResolvedReturnType<T>>() // 存储请求返回的数据

  if (!isRef(params)) {
    params = ref<IterateObject>(params)
  }
  if (Object.keys(defaultParams)) {
    params.value = { ...params.value, ...defaultParams }
  }

  /**
   * 执行请求的函数，支持传入额外参数。
   * @param p 额外的请求参数，可选。
   */
  const request = async <K>(p?: K) => {
    loading.value = true
    skipNext = true
    if (p) {
      params.value = { ...params.value, ...p }
    }
    const options = utils.deepCopy(params.value)

    // 如果有排序参数，则将其转换为字符串
    if (options.orderBy && Object.keys(options.orderBy).length) {
      options.orderBy = JSON.stringify(params.value.orderBy)
    }

    // 格式化日期相关的参数
    if (Array.isArray(options.dateTimePicker) && options.dateTimePicker.length) {
      options.startTime = options.dateTimePicker[0]
      options.endTime = options.dateTimePicker[1]
    } else {
      delete options.startTime
      delete options.endTime
    }
    delete options.dateTimePicker
    try {
      let data = await api(options)
      if (hook) {
        data = hook(data)
      }
      // @ts-expect-error ignore
      requestData.value = null
      requestData.value = data // 执行请求
    } catch (e) {
      console.log(e)
    }
    loading.value = false
    skipNext = false
  }

  const reset = async <K>(p?: K) => {
    skipNext = true
    params.value = JSON.parse(JSON.stringify(defaultParams))
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
      if (!skipNext) {
        request()
      }
    },
    { deep: true },
  )

  /**
   * 排序方式改变时的处理函数。
   * @param val 包含字段和排序顺序的对象。
   */
  const sortChange = (val: IterateObject) => {
    params.value.orderBy = {
      [val.field]: val.order,
    }
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
