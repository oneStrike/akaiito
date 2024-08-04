export const useStorage = <T>(key: string, defaultValue?: T) => {
  const storageValue = ref<T>(defaultValue)

  const getStorage = () => {
    storageValue.value = uni.getStorageSync(key)
  }

  const setStorage = (data) => {
    uni.setStorageSync(key, data)
  }

  const removeStorage = () => {
    uni.removeStorageSync(key)
  }
  getStorage(key)
  watch(
    storageValue,
    (newValue) => {
      setStorage(newValue)
    },
    { deep: true, immediate: true }
  )

  return {
    storageValue,
    setStorage,
    getStorage,
    removeStorage
  }
}
