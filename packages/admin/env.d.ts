/// <reference types="vite/client" />
import type dayjs from 'dayjs'
import 'vue'
import 'vue-router'

export {}
declare module 'vue-router' {
  interface RouteMeta {
    hide?: boolean
    hideAll?: boolean
    title?: string
    icon?: string
    roles?: string[]
    cache?: boolean
    order?: number
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
