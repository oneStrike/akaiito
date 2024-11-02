import type { RouterConfig } from '@/components/libs/types/config'

const guard: RouterConfig['routerGuard'] = async route => {
  console.log('路由进入前', route)
  return true
}

const enter: RouterConfig['routerEnter'] = () => {}

export const authentication = {
  guard,
  enter,
}
