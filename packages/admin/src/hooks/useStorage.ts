import { utils } from '@/utils'

/**
 * 从本地存储中读取和写入数据的组合式 API 函数
 *
 * @param key 存储的键名
 * @param defaultValue 默认值，当存储中没有该键时使用
 * @returns `storageValue` 对象
 */
export const useStorage = <T>(key: string, defaultValue?: T): Ref<T | null> => {
  const storage = window.localStorage
  let skipWatch = false

  // 显式地定义 storageValue 的类型
  const storageValue = ref<T | null>(defaultValue || null)

  const set = (value: T) => {
    storage.setItem(key, JSON.stringify(value))
  }

  const get = (key: string) => {
    const value = storage.getItem(key)
    skipWatch = true
    storageValue.value = value ? utils.parseJson(value) : defaultValue
    skipWatch = false
    return value
  }

  // 初始化时获取存储中的值
  get(key)

  watch(storageValue, (newValue) => {
    if (!skipWatch) {
      set(newValue)
    }
  })

  // 返回 storageValue
  return storageValue as Ref<T | null>
}
