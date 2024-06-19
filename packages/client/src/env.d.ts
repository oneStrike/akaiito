import type { IterateObject } from '@akaiito/typings/src'
import dayjs from 'dayjs'

declare module '*.vue' {
  // @ts-ignore
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type ObjType<T = any> = Record<string | symbol, T>

interface WindowExtensions {
  ROUTES: ({
    path: string
    name?: string
    meta?: IterateObject
    root?: string
    auth?: string
    tabBar: boolean
    subPage: boolean
  } & IterateObject)[]
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $filePath: (path: string) => string
    $dayjs: typeof dayjs
  }
}

declare global {
  interface Window extends WindowExtensions {}
}
