import '@vue/runtime-core'
import { configEnum } from '@/config'
import dayjs from 'dayjs'

declare global {
  interface Uni extends UniNamespace.Uni {
    $u: Record<string, any>
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // @ts-ignore
    $FILE_PATH: configEnum.FILE_PATH
    $dayjs: typeof dayjs
    $u: any
  }
}
