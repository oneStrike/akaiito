//每个模块通用的配置
import { IFiles } from '@/typings/common'

export enum DiyModuleEnum {
  OverallPage = 'OverallPage',
  AttrNavBar = 'AttrNavBar',
  AttrSearch = 'AttrSearch',
  DiyNavMenu = 'DiyNavMenu',
  DiySwiper = 'DiySwiper',
  DiyNotice = 'DiyNotice'
}

export interface IBasicDiy {
  backgroundType: 'color' | 'image'
  backgroundColor: string
  backgroundImage: IFiles
  borderRadius: 'close' | 'around' | 'top' | 'bottom'
  aroundRadius: number
  topRadius: number
  bottomRadius: number
  bothSideMargin: number
  divider: boolean
}

export interface IDivider {
  backgroundColor: string
  height: number
  bothSideMargin: number
}

//最终的布局信息
export interface IDiyLayoutData {
  name: string
  module: string
  attr: Record<string, any>
  attrComponent: DiyModuleEnum
  commonAttr: IBasicDiy
  divider: IDivider
}

//页面整体配置
export interface IOverallPage {
  pageName: string
  adaptiveStatusBar: boolean
  backgroundStyle: 'color' | 'image'
  backgroundColor: string
  backgroundImage: IFiles
}
