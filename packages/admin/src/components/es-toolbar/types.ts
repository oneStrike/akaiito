import type { ButtonProps } from 'element-plus'
import type { EsFormProps } from '@/components/es-form/types'

export type ToolbarFilter = EsFormProps['options']

export interface Toolbar {
  type: 'dropdown' | 'button'
  label: string
  value?: any
  slotName?: string
  props?: any
  buttonProps?: Partial<ButtonProps>
  options?: {
    label: string
    value: any
    props?: {
      disabled?: boolean
      divided?: boolean
    }
  }[]
}

export interface EsToolbarProps {
  toolbar?: Toolbar[]
  filter?: ToolbarFilter
  selected?: boolean
  followSelection?: boolean
}
