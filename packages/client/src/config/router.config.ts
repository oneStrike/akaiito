export const routerConfig = {
  //路由守卫
  routerGuard: (path: string) => {
    console.log(path)
    return true
  },
  prefix: {
    normal: '/pages/',
    tabBar: '/pages/tab-bar/'
  }
}
