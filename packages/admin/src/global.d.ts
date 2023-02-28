import config from '@/config'
import 'vue-router'
import 'vue'
import dayjs from 'dayjs'

export {}
declare module 'vue-router' {
  interface RouteMeta {
    hide?: boolean
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
    $FILE_PATH: config.FILE_PATH
    $BASE_URL: config.BASE_URL
    $dayjs: typeof dayjs
  }
}

