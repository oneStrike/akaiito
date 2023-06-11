import type { ButtonProps, PopconfirmProps } from 'naive-ui'

export interface UseDropdownOptions<T> {
  source: T
  text: string
  tipField: keyof T
  confirm: (params: T) => void | Promise<void>
  cancel?: (params: T) => void | Promise<void>
  props?: PopconfirmProps
  btnProps?: ButtonProps
  trigger?: () => JSX.Element
}
export type UsePopConfirm = <T>(options: UseDropdownOptions<T>) => JSX.Element
