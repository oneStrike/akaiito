export function useRefresh(handler: () => Promise<any>) {
  const refresh = () => {
    onPullDownRefresh(() => {
      handler().then(() => {
        uni.stopPullDownRefresh()
      })
    })
  }

  refresh()
  return { refresh }
}
