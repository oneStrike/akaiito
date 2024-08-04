export const useStorage = <T>(key: string, defaultValue?: T) => {
  const storageValue = ref<T>()

  const getStorage = () => {
    storageValue.value = uni.getStorageSync(key)
  }

  const setStorage = (data: any) => {
    uni.setStorageSync(key, data)
  }

  const removeStorage = () => {
    uni.removeStorageSync(key)
  }
  getStorage()
  if (!storageValue.value && typeof defaultValue !== 'undefined') {
    storageValue.value = defaultValue
  }

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
