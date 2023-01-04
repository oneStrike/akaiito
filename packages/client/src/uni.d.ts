import '@vue/runtime-core'
import 'vue'
import dayjs from 'dayjs'
import * as config from '@/config'
export {}
declare global {
  interface Uni extends UniNamespace.Uni {
    $u: Record<string, any>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $FILE_PATH: typeof config.default.FILE_PATH
    $BASE_URL: typeof config.default.BASE_URL
    $dayjs: typeof dayjs
  }
}
