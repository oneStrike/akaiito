import type { FormItemProps, FormProps } from 'element-plus'

export type EsFormComponent =
  | 'Input'
  | 'InputNumber'
  | 'Textarea'
  | 'RichText'
  | 'Radio'
  | 'Checkbox'
  | 'Select'
  | 'Date'
  | 'DateTime'
  | 'Upload'

export type FormComponentProps = Partial<FormItemProps> & {
  span?: number
  class?: string
  style?: IterateObject
  defaultValue?: any
}

export interface EsFormOptions {
  show?: boolean
  field: string
  props?: FormComponentProps
  component: EsFormComponent
  componentProps?: IterateObject
  on?: IterateObject
}

export interface EsFormProps {
  modelValue: IterateObject
  options: EsFormOptions[]
  formProps?: Partial<Omit<FormProps, 'model'>>
  showBtn?: boolean
  submitText?: string
  resetText?: string
}
