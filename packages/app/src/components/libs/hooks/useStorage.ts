export function useStorage<T>(key: string, defaultValue?: T, init = true) {
  const storageValue = ref<T>()

  const getStorage = () => {
    const result = uni.getStorageSync(key)
    storageValue.value = result
    return result
  }

  const setStorage = (data: any) => {
    uni.setStorageSync(key, data)
  }

  const removeStorage = () => {
    uni.removeStorageSync(key)
  }

  if (init) {
    getStorage()
  }

  if (!storageValue.value && typeof defaultValue !== 'undefined') {
    storageValue.value = defaultValue
  }

  watch(
    storageValue,
    newValue => {
      setStorage(newValue)
    },
    { deep: true },
  )

  return {
    key,
    storageValue,
    set: setStorage,
    get: getStorage,
    remove: removeStorage,
  }
}
