import 'vue-router'
import 'vue'
import dayjs from 'dayjs'

export {}
declare module 'vue-router' {
  interface RouteMeta {
    hideMenu?: boolean
    title?: string
    icon?: IconName
    roles?: string[]
    cache?: boolean
    sort?: number
    url?: string
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $FILE_PATH: string
    $BASE_URL: string
    $dayjs: typeof dayjs
  }
}

declare module 'vuedraggable'
