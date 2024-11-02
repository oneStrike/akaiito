import type { EsPickerProps } from '@/components/es-picker/types'

import type { IterateObject } from '@/types/global'

import type {
  UniDatetimePickerType,
  UniEasyinputType,
  UniFormsValidateFunction,
} from '@uni-helper/uni-types'

/**
 * EsForm 的属性接口
 */
export interface EsFormProps {
  /**
   * 表单的绑定值
   */
  modelValue?: IterateObject

  /**
   * 标签位置，可以是 'left' 或 'top'
   */
  labelPosition: 'left' | 'top'

  /**
   * 标签宽度
   */
  labelWidth: number

  /**
   * 标签对齐方式，可以是 'left'、'center' 或 'right'
   */
  labelAlign: 'left' | 'center' | 'right'

  /**
   * 表单项的配置数组
   */
  options: EsFormOptions[]
}

/**
 * EsForm 的组件类型枚举
 */
export type EsFormComponent =
  | 'input'
  | 'radio'
  | 'date'
  | 'upload'
  | 'picker'
  | 'checkbox'

/**
 * 表单项的验证规则接口
 */
export interface FormItemRule {
  /**
   * 是否必填
   */
  required?: boolean

  /**
   * 验证失败时显示的错误信息
   */
  errorMessage?: string

  /**
   * 自定义验证函数
   */
  validateFunction?: UniFormsValidateFunction

  /**
   * 正则表达式验证
   */
  pattern?: RegExp
}

/**
 * EsForm 的选项接口
 */
export interface EsFormOptions {
  /**
   * 表单项的标签文本
   */
  label: string

  /**
   * 表单项的字段名称
   */
  field: string

  /**
   * 表单项的组件类型
   */
  component: EsFormComponent

  /**
   * 标签宽度，默认继承全局设置
   */
  labelWidth?: number

  /**
   * 标签对齐方式，默认继承全局设置
   */
  labelAlign?: 'left' | 'center' | 'right'

  /**
   * 表单项的属性配置
   */
  props?: {
    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * 输入框占位符
     */
    placeholder?: string

    /**
     * 输入框类型
     */
    inputType?: UniEasyinputType

    /**
     * 日期选择器类型
     */
    dateType?: UniDatetimePickerType

    /**
     * picker 选择器类型
     */
    pickerType?: EsPickerProps['mode']

    /**
     * 数据字典代码
     */
    dataDictCode?: string

    /**
     * 选项列表
     */
    options?: {
      /**
       * 选项文本
       */
      text: string | number

      /**
       * 选项值
       */
      value: string | number

      /**
       * 是否禁用
       */
      disabled?: boolean
    }[]
  } & IterateObject

  /**
   * 表单项的验证规则
   */
  rules?: FormItemRule[]
}
