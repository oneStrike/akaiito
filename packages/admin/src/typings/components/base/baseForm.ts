import type { Rule } from 'ant-design-vue/es/form'
import type { BaseFormEnum } from '@/enum/baseFormEnum'

export type BaseFormComponent = 'Input'

export interface BaseOptions {
  label: string
  value: string | number
}

export interface BaseFormOptions {
  field: string
  component: BaseFormEnum
  bind: {
    label?: string
    required?: boolean
    rules?: Rule[]
  }
  componentProps: {
    bind?: Record<string, any>
    options?: BaseOptions[]
  }
}

export interface BaseForm {
  options: BaseFormOptions[]
}
