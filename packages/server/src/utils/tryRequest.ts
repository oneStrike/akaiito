export const tryRequest = (fn: AsyncFn, count = 3, timeout = 5000) => {
  const handler = async () => {
    try {
      return await fn()
    } catch (e) {
      return { error: true, errorInfo: e }
    }
  }
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < count; i++) {
      const data = await handler()
      if (!data.error) {
        resolve(data)
        break
      }
    }
  })
}
