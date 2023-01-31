import type { IDiyModule } from '~@/modules/diy'
import { DiyModuleEnum } from '@/enum/diyModuleEnum'
import {
  defaultAttrCommon,
  defaultAttrDivider,
  defaultAttrNavBar,
  defaultAttrSearch
} from '@/views/App/Devise/PageDiy/attr/default'

export const baseModule: IDiyModule[] = [
  {
    name: '导航栏',
    type: 'DiyNavBar',
    module: 'base',
    icon: 'airplane',
    attrComponent: DiyModuleEnum.AttrNavBar,
    commonAttr: { ...defaultAttrCommon(), bothSideMargin: 0 },
    divider: defaultAttrDivider(),
    attr: defaultAttrNavBar()
  },
  {
    name: '搜索',
    type: 'DiySearch',
    module: 'base',
    icon: 'search',
    attrComponent: DiyModuleEnum.AttrSearch,
    divider: defaultAttrDivider(),
    commonAttr: { ...defaultAttrCommon(), bothSideMargin: 0 },
    attr: defaultAttrSearch()
  },
  {
    name: '菜单',
    type: 'DiyNavMenu',
    module: 'base',
    icon: 'navMenu',
    attrComponent: DiyModuleEnum.DiyNavMenu,
    divider: defaultAttrDivider(),
    commonAttr: defaultAttrCommon(),
    attr: {}
  },
  {
    name: '轮播图',
    type: 'DiySwiper',
    module: 'base',
    icon: 'swatch',
    divider: defaultAttrDivider(),
    commonAttr: defaultAttrCommon(),
    attr: {},
    attrComponent: DiyModuleEnum.DiySwiper
  },
  {
    name: '公告',
    type: 'DiyNotice',
    module: 'base',
    icon: 'megaphone',
    divider: defaultAttrDivider(),
    commonAttr: defaultAttrCommon(),
    attr: {},
    attrComponent: DiyModuleEnum.DiyNotice
  }
]
