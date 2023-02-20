import type {
  CheckboxInstance,
  DatePickerInstance,
  FormItemInstance,
  InputInstance,
  InputNumberInstance,
  RadioInstance,
  SelectInstance
} from '@arco-design/web-vue'

export type BaseFormComponentType =
  | 'Input'
  | 'Radio'
  | 'Check'
  | 'Date'
  | 'Select'
  | 'Upload'

export type BaseFormComponentProps =
  | InputInstance['$props']
  | InputNumberInstance['$props']
  | RadioInstance['$props']
  | CheckboxInstance['$props']
  | SelectInstance['$props']
  | DatePickerInstance['$props']

export interface BaseFromFilterOptions {
  label: string
  value: string | number
  disabled?: boolean
}

export interface BaseFormOptions {
  component: BaseFormComponentType
  bind: FormItemInstance['$props']
  componentProps: {
    bind?: BaseFormComponentProps
    options?: BaseFromFilterOptions[]
  }
}
