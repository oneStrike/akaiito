import config from '@/config'
import 'vue-router'
import 'vue'
import dayjs from 'dayjs'
import type { TIconName } from '~@/svgicon'
import type { LoadingBarInst } from 'naive-ui/es/loading-bar/src/LoadingBarProvider'
import type { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import type { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'

export {}
declare module 'vue-router' {
  interface RouteMeta {
    hideParent?: boolean
    hideAllMenu?: boolean
    hideMenu?: boolean
    title?: string
    icon?: TIconName
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

declare interface Window {
  $message: LoadingBarInst
  $dialog: DialogApiInjection
  $loadingBar: LoadingBarInst
  $notification: NotificationApiInjection
}

declare module 'vuedraggable'
