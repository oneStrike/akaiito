import dayjs from 'dayjs'
/**
 * 设置本地缓存
 * @param key key
 * @param value value
 * @param expiredAt 过期时间，毫秒
 */
const setStorage = <T>(key: string, value: T, expiredAt?: number) => {
  if (expiredAt) {
    uni.setStorageSync(key, {
      value,
      expiredAt,
      createdAt: dayjs().valueOf()
    })
    return
  }
  uni.setStorageSync(key, value)
}

const getStorage = <T = any>(key: string): T => {
  const storage = uni.getStorageSync(key)
  if (storage.expiredAt) {
    const { expiredAt, createdAt } = storage
    if (dayjs().valueOf() - createdAt >= expiredAt) {
      throw new Error('缓存已过期！')
    }
    return storage
  }
  return storage
}

export const useStorage = {
  set: setStorage,
  get: getStorage
}
