import path from 'path'
import type {
  TransformPagesConf,
  ObjType,
  Pages
} from 'src/components/libs/typings'

class TransformPages {
  private CONFIG: TransformPagesConf = {
    includes: []
  }
  // pages.json地址
  private readonly pagesPath: string
  // Uni-app的pages.js导出的方法
  private uniPagesHandler: any
  // 路由表
  public declare ROUTES: Pages[]
  // 平台
  private readonly platform: string

  /**
   * 构造函数
   * @param config 保留字段配置
   * @param pagesPath pages.json 文件相对与项目根目录的位置
   */
  constructor(pagesPath = './src', config?: TransformPagesConf) {
    if (config?.includes) {
      this.CONFIG.includes = config.includes
    }
    this.platform = process.env['UNI_PLATFORM']!
    this.pagesPath = path.resolve(process.cwd(), pagesPath)
    this.uniPagesHandler = require('@dcloudio/uni-cli-shared/dist/json/pages.js')
    this.ROUTES = this.getPages().concat(this.getNotMpRoutes())
  }

  /**
   * 获取所有pages.json下的内容 返回json
   */
  get pagesJson() {
    return this.uniPagesHandler.parsePagesJson(this.pagesPath, this.platform)
  }

  /**
   * 通过读取pages.json文件 生成直接可用的routes
   */
  getPages(pages = this.pagesJson.pages, root?: string): Pages[] {
    const tabBarPages = this.pagesJson.tabBar.list.map(
      (item: { pagePath: string }) => item.pagePath
    )
    return pages.map((item: ObjType) => {
      const route: Pages = {
        path: item.path,
        name: item.name || '',
        meta: item.meta || {},
        root: root || '',
        auth: item.auth || '',
        subPage: !!root,
        tabBar: tabBarPages.includes(item.path)
      }
      this.CONFIG.includes.forEach((key) => {
        route[key] = item[key] || ''
      })
      return route
    })
  }

  /**
   * 解析小程序分包路径
   */
  getNotMpRoutes(): Pages[] {
    const { subPackages } = this.pagesJson
    let routes: Pages[] = []
    if (subPackages == null || subPackages.length == 0) {
      return []
    }
    subPackages.forEach((item: Record<string, never>) => {
      routes = routes.concat(this.getPages(item.pages, item.root))
    })
    return routes
  }
}

export default TransformPages
