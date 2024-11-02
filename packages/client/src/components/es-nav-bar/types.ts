import type { EsIconProps } from '@/components/es-icons/types'
import type { EsTextProps } from '@/components/es-text/types'

/**
 * 定义LS导航栏的属性接口
 */
export interface EsNavBarProps {
  /**
   * 导航栏左侧是否显示
   */
  left?: boolean
  /**
   * 左侧按钮是否具有返回上一页的功能
   */
  back?: boolean
  /**
   * 标题文本内容
   */
  title: EsTextProps['text']
  /**
   * 左侧图标名称
   */
  leftIcon?: EsIconProps['name']
  /**
   * 左侧图标大小
   */
  leftSize?: EsIconProps['size']
  /**
   * 左侧图标颜色
   */
  leftColor?: EsIconProps['color']
  /**
   * 标题颜色
   */
  titleColor?: EsTextProps['color']
  /**
   * 标题大小
   */
  titleSize?: EsTextProps['size']
  /**
   * 标题对齐方式，可选值为 'left' | 'center' | 'right'
   */
  titleAlign?: 'left' | 'center' | 'right'
  /**
   * 是否显示底部边框
   */
  borderBottom?: boolean
  /**
   * 导航栏背景颜色
   */
  background?: string

  /**
   * 导航栏滚动渐变背景
   */
  fade?: boolean
}
