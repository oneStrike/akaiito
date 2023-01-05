import type { TIconName } from './svgicon'
import type { CommonUploadRes } from '../common/apiTypes/upload'
import type { DiyModuleEnum } from './enum/diyModuleEnum'
import type { AdminGetClientPageRes } from './apiTypes/clientManage'

//每个模块通用的配置
export interface IBasicDiy {
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
export interface IDivider {
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
export interface IDiyModule {
  name: string
  type: string
  attr: IRibbon
  module: string
  icon: TIconName
  divider: IDivider
  attrComponent: DiyModuleEnum
  commonAttr: IBasicDiy
}
//通用模块配置
export interface IRibbon extends Record<string, any> {
  ribbon?: boolean
  ribbonConfig?: IRibbonItem[]
}

//功能区标准结构
export interface IRibbonItem {
  id: number
  icon?: string
  iconType?: 'font' | 'image' | ''
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
  ribbon?: string | number
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
