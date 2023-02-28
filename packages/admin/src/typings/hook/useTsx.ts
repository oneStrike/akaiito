import type { ButtonProps, DropdownProps } from 'naive-ui'

export interface UseDropdownOptions<T> {
  source: T
  text: string
  tipField: keyof T
  confirm: (params: T) => void | Promise<void>
  cancel?: (params: T) => void | Promise<void>
  props?: DropdownProps
  btnProps?: ButtonProps
}
export type UsePopConfirm = <T>(options: UseDropdownOptions<T>) => JSX.Element
