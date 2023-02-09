type components =
  | 'Input'
  | 'Textarea'
  | 'InputNumber'
  | 'Radio'
  | 'Check'
  | 'Select'
  | 'DateTime'
  | 'Upload'
  | 'ColorPicker'
  | 'Switch'
  | 'Editor'

export type selectOptions = { label: string; value: number | string }

export interface FormComponent {
  tips?: string
  bind?: Record<string, any>
  on?: Record<string, () => never>
  options?: selectOptions[]
}

export interface FormItem {
  width?: number
  bind?: Record<string, any> & { tips?: string }
  field: string
  hide?: boolean
  component: components
  componentProps: FormComponent
  children?: ({
    component: string
  } & FormComponent)[]
}

export interface BasicForm {
  inline?: boolean
  labelPosition?: 'left' | 'right' | 'top'
  labelWidth?: string | number
  labelSize?: number
  submitBtn?: boolean
  showBtn?: boolean
  btnPosition?: 'left' | 'right' | 'center'
  btnLoading?: boolean
  submitBtnText?: string
  baseData?: any
  options: FormItem[]
}
