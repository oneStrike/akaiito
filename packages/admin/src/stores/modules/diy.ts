import { DiyModuleEnum } from '@/enum/diyModuleEnum'
import type { IDiyModule, IOverallPage, TDiyLayoutData } from '~@/modules/diy'
import type { AdminGetDiyPageRes } from '~@/apiTypes/diyClientPage'
import { useMessage } from '@/hooks/useMessage'

const diyStore = defineStore('diy', {
  state: () => {
    return {
      //拖拽状态
      dragStatus: false,
      //拖拽数据
      dragData: {} as IDiyModule | Record<string, any>,
      //所有的页面布局数据
      layoutData: [] as TDiyLayoutData[],
      // 整体页面配置项
      overallPage: {
        pageName: '新建页面',
        adaptiveStatusBar: true,
        backgroundStyle: 'color',
        backgroundColor: '#f5f5f5',
        backgroundImage: []
      } as IOverallPage,
      //当前正在编辑的模块配置项
      currentAttr: {
        attrComponent: DiyModuleEnum.OverallPage
      } as IDiyModule,
      //当前正在编辑的模块索引
      currentModuleIndex: null as null | number,
      //是否显示手机状态栏，显示的时候会影响最顶部的操作
      phoneStatusBar: true,
      //重新编辑的diy数据，和新建调用的接口不一样
      reEditDiyData: null as null | AdminGetDiyPageRes[number]
    }
  },

  getters: {
    //获取当前操作的模块
    currentModule(): null | TDiyLayoutData {
      if (typeof this.currentModuleIndex !== 'number') return null
      return this.layoutData[this.currentModuleIndex]
    }
  },

  actions: {
    //设置当前操作模块的索引
    setCurrentModuleIndex(index: number | null) {
      this.currentModuleIndex = index
    },

    //删除一个模块
    deleteLayoutModule(index: number) {
      //如果删除的是正在编辑的模块，切换到页面编辑项
      if (index === this.currentModuleIndex) {
        this.setCurrentModuleIndex(null)
      }
      this.layoutData.splice(index, 1)
    },

    //设置布局信息
    setLayoutData(data: IDiyModule, index?: number) {
      if (this.layoutData.length >= 20) {
        useMessage('error', '至多添加20个模块')
        return
      }
      const navBar = this.layoutData.some((item) => item.module === 'DiyNavBar')
      if (navBar && data.attrComponent === DiyModuleEnum.AttrNavBar) {
        useMessage('error', '至多添加1个导航栏模块')
        return
      }
      const { type, name, attr, attrComponent, commonAttr, divider } =
        JSON.parse(JSON.stringify(data))
      const diyData = {
        module: type,
        name,
        attr,
        divider,
        commonAttr,
        attrComponent
      }
      if (typeof index === 'number') {
        this.layoutData.splice(index + 1, 0, diyData)
        return
      }
      this.layoutData.push(diyData)
    }
  }
})

export default diyStore
