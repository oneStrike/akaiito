export function deepCopy<T>(obj: T): T {
  // 处理基本数据类型和 null
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 处理 Date 对象
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T
  }

  // 处理 RegExp 对象
  if (obj instanceof RegExp) {
    return new RegExp(obj) as unknown as T
  }

  // 处理 Map 对象
  if (obj instanceof Map) {
    const copy = new Map()
    obj.forEach((value, key) => {
      copy.set(deepCopy(key), deepCopy(value))
    })
    return copy as unknown as T
  }

  // 处理 Set 对象
  if (obj instanceof Set) {
    const copy = new Set()
    obj.forEach((value) => {
      copy.add(deepCopy(value))
    })
    return copy as unknown as T
  }

  // 处理数组
  if (Array.isArray(obj)) {
    const copy: any[] = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i])
    }
    return copy as unknown as T
  }

  // 处理普通对象
  if (obj instanceof Object) {
    const copy: any = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = deepCopy(obj[key])
      }
    }
    return copy as unknown as T
  }

  // 处理函数
  if (typeof obj === 'function') {
    // @ts-expect-error ignore
    return obj.bind({}) as unknown as T
  }

  throw new Error('Unable to copy obj! Its type isn\'t supported.')
}
