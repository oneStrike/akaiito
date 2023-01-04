import '@vue/runtime-core'
import 'vue'
import config from '@/config'
import dayjs from 'dayjs'
export {}
declare global {
  interface Uni extends UniNamespace.Uni {
    $u: Record<string, any>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $FILE_PATH: config.FILE_PATH
    $BASE_URL: config.BASE_URL
    $dayjs: typeof dayjs
  }
}
