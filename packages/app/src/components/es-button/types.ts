import type { EsTextProps } from '@/components/es-text/types'

/**
 * 定义ES按钮组件的属性接口，这些属性描述了按钮的视觉表现和行为.
 * 通过继承EsTextProps（除去'size'属性），EsButtonProps获得了文本组件的大部分属性，
 */
export interface EsButtonProps extends Omit<EsTextProps, 'size'> {
  /**
   * 按钮的大小，提供了四种不同的尺寸选项，以适应不同的布局和使用场景.
   */
  size?: 'mini' | 'small' | 'medium' | 'large'

  /**
   * 按钮的类型，用于区分按钮的重要程度和功能，有五种类型可供选择.
   */
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error'

  /**
   * 按钮中文字的大小
   */
  textSize?: EsTextProps['size']

  /**
   * 按钮文字的颜色
   */
  textColor?: EsTextProps['color']

  /**
   * 是否为按钮启用朴素样式
   */
  plain?: boolean

  /**
   * 是否将按钮的边角设为圆形，可以是一个布尔值或具体的圆角数值
   */
  round?: boolean | number

  /**
   * 是否将按钮固定在底部，
   */
  fixed?: boolean

  /**
   * 是否禁用按钮，禁用状态下按钮通常不可点击
   */
  disabled?: boolean
}
