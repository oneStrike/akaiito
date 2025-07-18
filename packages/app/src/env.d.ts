import type dayjs from 'dayjs'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filePath: (path: string) => string
    $backgrountImage: (path: string) => string
    $dayjs: typeof dayjs
  }
}

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
