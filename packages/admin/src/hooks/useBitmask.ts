export const useBitmask = {
  /**
   * 将逗号分隔的 bit 值转换为整数 bitmask
   */
  set(bitmask: string): number {
    return bitmask
      .split(',')
      .reduce((acc, val) => acc + Number.parseInt(val, 10), 0)
  },

  /**
   * 判断某个 bit 是否被设置
   */
  has(bitmask: number, flag: number): boolean {
    return (bitmask & flag) === flag
  },

  /**
   * 将 bitmask 拆分成所有启用的 bit 标志数组
   */
  split(bitmask: number): number[] {
    if (!bitmask) {
      return []
    }
    const result: number[] = []
    let flag = 1
    while (flag <= bitmask) {
      if ((bitmask & flag) !== 0) {
        result.push(flag)
      }
      flag <<= 1
    }
    return result
  },
}
