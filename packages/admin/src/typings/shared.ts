//添加loading属性，主要用于在NSwitch组件onUpdateValue中使用
export type JoinLoading<T extends Record<string | symbol, any>> = {
  loading: boolean
} & T
