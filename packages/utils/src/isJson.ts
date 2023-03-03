export const isJson = (str: string) => {
  try {
    const res = JSON.parse(str)
    if (typeof res == 'object' && res) return res
  } catch (e) {
    return false
  }
}
