import config from '@/config'
import 'vue-router'
import 'vue'
import dayjs from 'dayjs'
import type { Directive } from 'vue'
import debounce from '@/directives/debounce'
import type { IBinding } from '@/directives/debounce'
import type { CommonUploadRes } from '@akaiito/typings/src/common/apiTypes/upload'
import type { IconName } from '@/typings/components/svgicon'

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
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $FILE_PATH: config.FILE_PATH
    $BASE_URL: config.BASE_URL
    $dayjs: typeof dayjs
    vDebounce: Directive<typeof debounce, IBinding['value']>
  }
}

declare module '@element-plus' {
  interface UploadUserFile {
    response?: { data: CommonUploadRes }
  }
}
declare module 'vuedraggable'
