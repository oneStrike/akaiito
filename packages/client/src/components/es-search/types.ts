/**
 * 定义搜索框组件的属性接口
 */
export interface EsSearchProps {
  /**
   * 搜索框的占位符
   */
  placeholder?: string

  /**
   * 搜索框前的图标
   */
  icon?: string

  /**
   * 是否自动聚焦搜索框
   */
  focus?: boolean

  /**
   * 是否修剪输入的字符空格
   */
  trim?: boolean

  /**
   * 搜索框的圆角半径
   */
  radius?: number

  /**
   * 搜索框的背景颜色
   */
  backgroundColor?: string

  /**
   * 搜索框的最大输入长度
   */
  maxLength?: number

  /**
   * 是否禁用搜索框
   */
  disable?: boolean
}
