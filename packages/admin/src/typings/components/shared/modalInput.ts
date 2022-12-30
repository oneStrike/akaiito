import type { InputInstance } from 'element-plus'

export interface IModalInput {
  visible: boolean
  label: string
  title?: string
  inputValue?: string
  required?: boolean
  inputAttr: InputInstance['$props']
}
