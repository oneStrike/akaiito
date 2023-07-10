export const routerConfig = {
  routerGuard: (path: string) => {
    console.log(path)
    return true
  },
  prefix: {
    normal: '/pages',
    tabBar: '/pages/tab-bar/'
  }
}
