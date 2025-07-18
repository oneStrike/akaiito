/**
 * 定义了EsPage组件的属性接口。
 */
export interface EsPageProps {
  /**
   * 导航栏背景色
   */
  navBarBackground?: string
  /**
   * 导航栏文字
   */
  title?: string

  /**
   * 背景颜色
   */
  backgroundColor?: string

  /**
   * 内边距
   */
  padding?: boolean

  /**
   * 是否展示空数据页
   */
  empty?: boolean

  /**
   * 是否展示顶部边框
   */
  borderTop?: boolean

  /**
   * 是否占位底部按钮位置，padding-bottom:200rpx
   */
  fixedButton?: boolean
  /**
   * 是否占位底部tabBar位置,仅H5生效，padding-bottom:50rpx
   */
  tabBar?: boolean
}
