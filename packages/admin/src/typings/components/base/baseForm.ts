import type { Rule } from 'ant-design-vue/es/form'
import type { BaseFormEnum } from '@/enum/baseFormEnum'

export interface BaseFromFilterOptions {
  label: string
  value: string | number
  disabled?: boolean
}

export interface BaseFormOptions {
  field: string
  component: BaseFormEnum
  bind: {
    label?: string
    required?: boolean
    rules?: Rule[]
    width?: number | string
  }
  componentProps: {
    bind?: Record<string, any>
    options?: BaseFromFilterOptions[]
  }
}

export interface BaseForm {
  options: BaseFormOptions[]
}
