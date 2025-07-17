// 导入轮播指示器组件的属性类型
import type { EsSwiperIndicatorProps } from '@/components/es-swiper-indicator/types'
// 导入文本组件的属性类型
import type { EsTextProps } from '@/components/es-text/types'

/**
 * 轮播组件的属性接口
 * 该接口定义了轮播组件所需的各种配置属性
 */
export interface EsSwiperProps {
  // 轮播选项数组，每个选项通常包含要展示的内容
  options: IterateObject[]
  // 轮播模式，可以是默认模式、缩放模式或文本模式
  mode?: 'default' | 'zoom' | 'text'
  // 指定要作为标题的字段名
  field?: string
  // 是否显示标题，默认为false
  title?: boolean
  // 轮播高度，以像素为单位
  height?: number
  // 是否自动播放，默认为false
  autoPlay?: boolean
  // 底部蒙层的颜色
  maskField?: string
  // 是否显示指示器，默认为false
  indicator?: boolean
  // 是否显示箭头按钮，默认为false
  arrows?: boolean
  // 图片间隙，以像素为单位，默认为0
  gap?: number
  // 文本大小，参照文本组件的大小属性
  textSize?: EsTextProps['size']
  // 文本颜色，参照文本组件的颜色属性
  textColor?: EsTextProps['color']
  // 指示器模式，参照轮播指示器组件的模式属性
  indicatorMode?: EsSwiperIndicatorProps['mode']
  // 指示器颜色，参照轮播指示器组件的颜色属性
  indicatorColor?: EsSwiperIndicatorProps['color']
  // 指示器位置，参照轮播指示器组件的位置属性
  indicatorPosition?: EsSwiperIndicatorProps['position']
  // 指示器激活时的颜色，参照轮播指示器组件的激活颜色属性
  indicatorActiveColor?: EsSwiperIndicatorProps['activeColor']
}
