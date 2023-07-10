import type { TreeProps } from 'naive-ui'
import type { TreeRenderProps } from 'naive-ui/es/tree/src/interface'
import type { VNodeChild } from 'vue'

//添加loading属性，主要用于在NSwitch组件onUpdateValue中使用
export type JoinLoading<T extends Record<string | symbol, any>> = {
  loading: boolean
} & T

//tree组件的renderSuffix复写
export type RenderSuffix<T extends Record<string | symbol, any>> = ({
  options
}: {
  options: T
}) => TreeRenderProps

