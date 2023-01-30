import type { IDiyPageNavBar, IDiyPageSearch } from '~@/diyPageModule'
import type { IDiyBaseConfig, IDiyDivider } from '~@/diyPage'

//通用默认配置
export const defaultAttrCommon = (): IDiyBaseConfig => ({
  borderRadius: 'close',
  aroundRadius: 8,
  topRadius: 8,
  bottomRadius: 8,
  bothSideMargin: 16,
  backgroundType: 'color',
  backgroundColor: '#ffffff',
  backgroundImage: '',
  divider: true
})

//通用间距配置
export const defaultAttrDivider = (): IDiyDivider => ({
  backgroundColor: '#f5f5f5',
  bothSideMargin: 0,
  height: 16
})

//导航栏默认配置
export const defaultAttrNavBar = (): IDiyPageNavBar => ({
  height: 42,
  text: '我是导航栏',
  textColor: '#333333',
  enableRibbon: false
})
//搜索框默认配置
export const defaultAttrSearch = (): IDiyPageSearch => ({
  searchBoxHeight: 28,
  searchBoxRadius: 30,
  searchBoxColor: '#ffffff',
  searchBorderColor: '#f5f5f5',
  searchPlaceholder: '请输入搜索内容',
  searchPlaceholderType: 'text',
  searchPlaceholderColor: '#a8abb2',
  searchIconPosition: 'left',
  searchIcon: [
    {
      filename: 'search',
      mimeType: 'icon',
      path: 'search',
      _ext: 'icon'
    }
  ],
  searchIconColor: '#e7eaef'
})
