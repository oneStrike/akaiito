import type { TreeProps } from 'naive-ui'

//添加loading属性，主要用于在NSwitch组件onUpdateValue中使用
export type JoinLoading<T extends IteratorObject> = {
  loading?: boolean
} & T

//tree组件的renderSuffix复写
export type RenderSuffix = TreeProps['renderSuffix']
