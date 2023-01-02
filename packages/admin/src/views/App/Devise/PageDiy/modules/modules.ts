import type { IDiyModule } from '~@/diyPage'
import { DiyModuleEnum } from '@/enum/diyModuleEnum'
import {
  basicConfig,
  basicDivider
} from '@/views/App/Devise/PageDiy/attr/shared'

export const baseModule: IDiyModule[] = [
  {
    name: '导航栏',
    type: 'DiyNavBar',
    module: 'base',
    icon: 'airplane',
    attrComponent: DiyModuleEnum.AttrNavBar,
    commonAttr: { ...basicConfig(), bothSideMargin: 0 },
    divider: basicDivider(),
    attr: {
      //默认配置
      navBarHeight: 42,
      text: '我是导航栏',
      textColor: '#333333',
      ribbon: false,
      ribbonConfig: []
    }
  },
  {
    name: '搜索',
    type: 'DiySearch',
    module: 'base',
    icon: 'search',
    attrComponent: DiyModuleEnum.AttrSearch,
    divider: basicDivider(),
    commonAttr: basicConfig(),
    attr: {
      searchBoxColor: '#f5f5f5',
      searchBoxRadius: 30,
      searchBoxPlaceholder: '请输入搜索内容',
      textColor: '#a8abb2',
      iconPosition: 'left'
    }
  },
  {
    name: '菜单',
    type: 'DiyNavMenu',
    module: 'base',
    icon: 'navMenu',
    attrComponent: DiyModuleEnum.DiyNavMenu,
    divider: basicDivider(),
    commonAttr: basicConfig(),
    attr: {}
  },
  {
    name: '轮播图',
    type: 'DiySwiper',
    module: 'base',
    icon: 'swatch',
    divider: basicDivider(),
    commonAttr: basicConfig(),
    attr: {},
    attrComponent: DiyModuleEnum.DiySwiper
  },
  {
    name: '公告',
    type: 'DiyNotice',
    module: 'base',
    icon: 'megaphone',
    divider: basicDivider(),
    commonAttr: basicConfig(),
    attr: {},
    attrComponent: DiyModuleEnum.DiyNotice
  }
]
