import type { TIconName } from './svgicon'
import type { CommonUploadRes } from '../common/apiTypes/upload'
import type { DiyModuleEnum } from './enum/diyModuleEnum'
import type { AdminGetClientPageRes } from './apiTypes/clientManage'
import type { TDiyModuleItem } from './diyPageModule'
import type { DiyRibbonEnum } from './enum/diyModuleEnum'

//每个模块通用的配置
export interface IDiyBaseConfig {
  backgroundType: 'color' | 'image'
  backgroundColor: string
  backgroundImage: string | CommonUploadRes
  borderRadius: 'close' | 'around' | 'top' | 'bottom'
  aroundRadius: number
  topRadius: number
  bottomRadius: number
  bothSideMargin: number
  divider: boolean
}

//模块之间的间隙
export interface IDiyDivider {
  backgroundColor: string
  height: number
  bothSideMargin: number
}

//最终的布局信息
export type TDiyLayoutData = Pick<
  IDiyModule,
  'name' | 'module' | 'attr' | 'attrComponent' | 'commonAttr' | 'divider'
>

//页面整体配置
export interface IOverallPage {
  pageName: string
  adaptiveStatusBar: boolean
  backgroundStyle: 'color' | 'image'
  backgroundColor: string
  backgroundImage: CommonUploadRes
}

//编辑中的布局信息
export interface IDiyModule<T = TDiyModuleItem> {
  name: string
  type: string
  attr: T
  module: string
  icon: TIconName
  divider: IDiyDivider
  attrComponent: DiyModuleEnum
  commonAttr: IDiyBaseConfig
}

//功能区标准结构
export interface IRibbonItem {
  id: number
  icon?: string
  iconColor?: string
  ribbonName: string
  size: number
  autoWidth?: boolean
  ribbon: {
    type: string
    searchPlaceholderValue?: string[] | string
    searchRadius?: number
    webviewUrl?: string
    appletName?: string
    appId?: string
  } & Partial<AdminGetClientPageRes[number]>
}

//功能区表单编辑时的结构
export interface IRibbonFormItem extends Omit<IRibbonItem['ribbon'], 'type'> {
  icon?: string
  iconColor?: string
  ribbonName?: string
  size?: number
  type?: DiyRibbonEnum
  autoWidth?: boolean
  navBarHeight?: number
}

export interface IDiyData {
  diyName: string
  diyData: {
    page: IOverallPage
    modules: TDiyLayoutData[]
  }
}
