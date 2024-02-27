import type { IterateObject } from '@akaiito/typings/src'

declare module '*.vue' {
  // @ts-ignore
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type ObjType<T = any> = Record<string | symbol, T>

declare const ROUTES: ({
  path: string
  name?: string
  meta?: ObjType
  root?: string
  auth?: string
  tabBar: boolean
  subPage: boolean
} & IterateObject)[]
