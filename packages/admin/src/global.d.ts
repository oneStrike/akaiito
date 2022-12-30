import config from '@/config'
import 'vue-router'
import dayjs from 'dayjs'
import type { Directive } from 'vue'
import debounce from '@/directives/debounce'
import type { IBinding } from '@/directives/debounce'
import type { TIconName } from '@/typings/components/svgicon'
import type { SystemUploadResponse } from '@/typings/httpTypes/system/upload'

declare module 'vue-router' {
  interface RouteMeta {
    hideParent?: boolean
    hideAllMenu?: boolean
    hideMenuhideMenu?: boolean
    title?: string
    icon?: TIconName
    roles?: string[]
    cache?: boolean
    sort?: number
    url?: string
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $FILE_PATH: config.FILE_PATH
    $BASE_URL: config.BASE_URL
    $dayjs: typeof dayjs
    vDebounce: Directive<typeof debounce, IBinding['value']>
  }
}

declare module '@element-plus' {
  interface UploadUserFile {
    response?: { data: SystemUploadResponse }
  }
}
declare module 'vuedraggable'
