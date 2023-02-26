import type {
  CheckboxProps,
  ColorPickerProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioProps,
  SelectProps,
  TimeProps
} from 'naive-ui'
// @ts-ignore
import type { BasicUploadProps } from '@/components/basic/BasicUpload.vue'

export type BasicFormComponent =
  | 'Input'
  | 'InputNumber'
  | 'Textarea'
  | 'Select'
  | 'Radio'
  | 'Checkbox'
  | 'Date'
  | 'Time'
  | 'Upload'
  | 'Color'

export type BasicFormComponentPropsBind =
  | InputProps
  | InputNumberProps
  | SelectProps
  | RadioProps
  | CheckboxProps
  | DatePickerProps
  | TimeProps
  | ColorPickerProps
  | BasicUploadProps

export interface SelectOptions {
  label: string
  value: string | number
  disabled?: boolean
}

export interface BasicFormOptions {
  bind: FormItemProps
  component: BasicFormComponent
  componentProps: {
    bind: BasicFormComponentPropsBind
    options?: SelectOptions[]
  }
}
