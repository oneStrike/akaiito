import type { SlateDescendant } from '@wangeditor/editor'
import type dayjs from 'dayjs'
import 'vue'
import 'vue-router'

export {}
declare module 'vue-router' {
  interface RouteMeta {
    hideMenu?: boolean
    title?: string
    icon?: IconName
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

declare module 'vuedraggable'

declare module '@wangeditor/editor' {
  // 扩展 Text
  interface SlateText {
    text: string
  }

  // 扩展 Element
  interface SlateElement {
    type: string
    children: SlateDescendant[]
  }
}
