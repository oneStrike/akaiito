import type { RouterJumpMethodEnum } from '@/components/libs/enum/router'
import type { IterateObject } from '@/types/global'

export interface PageStyle {
  navigationStyle: 'default' | 'custom'
  navigationBarTitleText?: string
}

export type Pages = {
  path: string
  name?: string
  meta?: IterateObject
  root?: string
  auth?: string
  tabBar: boolean
  subPage: boolean
  style?: PageStyle
} & IterateObject

export interface IRouter {
  path?: string
  name?: string
  query?: IterateObject
  method?: RouterJumpMethodEnum
}

export interface BackOptions {
  /* 延迟多少时间后返回  毫秒 */
  delay?: number
  /* 返回的页数 */
  delta?: number
  /* 传递给目标页面的参数 */
  query?: IterateObject
  /* 是否触发目标页面的刷新机制 */
  refresh?: boolean
  /* 刷新多少张页面 */
  refreshCount?: number
}
