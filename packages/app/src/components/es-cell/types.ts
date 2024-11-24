/**
 * 选项卡配置接口
 */
export interface EsCellOptions {
  /**
   * 选项卡的标签文本
   */
  label: string | number

  /**
   * 选项卡的值
   */
  value: string | number

  /**
   * 选项卡的类型，可选'phone'或'image'
   */
  type?: 'phone' | 'image'

  /**
   * 选项卡的图标
   */
  icon?: string

  /**
   * 标签的颜色
   */
  labelColor?: string

  /**
   * 值的颜色
   */
  valueColor?: string
}

/**
 * 选项卡属性接口
 */
export interface EsCellProps {
  /**
   * 选项卡的布局模式，可选'follow'或'between'
   */
  mode?: 'follow' | 'between'

  /**
   * 标签的宽度
   */
  labelWidth?: number

  /**
   * 选项配置数组，用于描述多个选项卡的具体配置
   */
  options: EsCellOptions[]
}
