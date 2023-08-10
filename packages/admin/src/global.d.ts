import config from '@/config'
import 'vue-router'
import 'vue'
import dayjs from 'dayjs'
import type { IconName } from '@/typings/components/svgIcon'

export {}
declare module 'vue-router' {
  interface RouteMeta {
    hideParent?: boolean
    hideAllMenu?: boolean
    hideMenu?: boolean
    title?: string
    icon?: IconName
    roles?: string[]
    cache?: boolean
    sort?: number
    url?: string
  }

  interface _RouteRecordBase {
    label?: string
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $FILE_PATH: config.FILE_PATH
    $BASE_URL: config.BASE_URL
    $dayjs: typeof dayjs
  }
}

declare module 'vuedraggable'
