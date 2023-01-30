//通用模块配置
import type { DiyRibbonEnum } from './enum/diyModuleEnum'
import type { CommonUploadRes } from '../common/apiTypes/upload'

export interface IDiyPageCommon {
  id?: number
  type?: DiyRibbonEnum
  name?: string
  icon?: string
  iconType?: 'font' | 'image'
  iconColor?: string
  iconPosition?: 'left' | 'right'
  size?: number
  autoWidth?: boolean
}

//导航栏配置项
export interface IDiyPageNavBar extends IDiyPageCommon {
  height: number
  text: string
  textColor: string
  ribbon?: TDiyModuleItem[] | []
  enableRibbon: boolean
}

//搜索模块配置项
export interface IDiyPageSearch extends IDiyPageCommon {
  searchContainerWidth?: number | string
  searchBoxHeight: number
  searchContainerPadding?: number
  searchBoxRadius: number
  searchPlaceholderColor: string
  searchBorderColor: string
  searchBoxColor: string
  searchPlaceholderType: 'swiper' | 'text' | 'hot'
  searchPlaceholder: string
  searchIconPosition: 'left' | 'right'
  searchIcon: CommonUploadRes
  searchIconColor: string
}
//网页跳转配置项
export interface IDiyPageWeb extends IDiyPageCommon {
  webviewUrl: string
}

//跳转小程序配置项
export interface IDiyPageApplet extends IDiyPageCommon {
  appId: string
  appletName: string
}

export type TDiyModuleItem =
  | IDiyPageNavBar
  | IDiyPageSearch
  | IDiyPageWeb
  | IDiyPageApplet
