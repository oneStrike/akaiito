type RectResultType<T extends boolean> = T extends true
  ? UniApp.NodeInfo[]
  : UniApp.NodeInfo

export const useRect = <T extends boolean>(
  selector: string,
  all: T,
  scope?: any,
): Promise<RectResultType<T>> => {
  return new Promise<RectResultType<T>>((resolve, reject) => {
    let query: UniNamespace.SelectorQuery | null = null
    if (scope) {
      query = uni.createSelectorQuery().in(scope)
    } else {
      query = uni.createSelectorQuery()
    }
    query[all ? 'selectAll' : 'select'](selector)
      .boundingClientRect(rect => {
        if (all && Array.isArray(rect) && rect.length > 0) {
          resolve(rect as RectResultType<T>)
        } else if (!all && rect) {
          resolve(rect as RectResultType<T>)
        } else {
          reject(new Error('No nodes found'))
        }
      })
      .exec()
  })
}
