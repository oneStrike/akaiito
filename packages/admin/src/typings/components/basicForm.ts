type components =
  | 'Input'
  | 'Textarea'
  | 'InputNumber'
  | 'Radio'
  | 'Select'
  | 'Date'
  | 'DateTime'
  | 'Upload'
  | 'ColorPicker'
  | 'Switch'

type selectOptions = { label: string; value: number | string }

export interface IComponent {
  tips?: string
  bind?: Record<string, any>
  on?: Record<string, () => never>
  options?: selectOptions[]
}

export interface IFormItem {
  width?: number
  bind?: Record<string, any> & { tips?: string }
  field: string
  hide?: boolean
  component: components
  componentProps: IComponent
  children?: ({
    component: string
  } & IComponent)[]
}

export interface IBasicForm {
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
  options: IFormItem[]
}
