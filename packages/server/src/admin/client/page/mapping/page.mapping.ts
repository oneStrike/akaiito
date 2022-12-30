import { BaseMapping } from '../../../../shared/mapping/base.mapping'
import { ClientPageEntity } from '../entities/page.entity'
import { Repository } from 'sequelize-typescript'
import { InjectRepository } from '@midwayjs/sequelize'
import { PageDto } from '../dto/page.dto'
import { Provide } from '@midwayjs/core'

@Provide()
export class PageMapping extends BaseMapping<ClientPageEntity> {
  @InjectRepository(ClientPageEntity)
  protected repository: Repository<ClientPageEntity>

  pageList: Omit<PageDto, 'id'>[] = [
    {
      pageName: '首页',
      pagePath: '/pages/tabBar/home/home',
      pageTitle: '首页',
      role: 'normal',
      status: 1
    },
    {
      pageName: '用户中心',
      pagePath: '/pages/tabBar/profile/profile',
      pageTitle: '用户中心',
      role: 'normal',
      status: 1
    },
    {
      pageName: '会员中心',
      pagePath: '/pages/memberCenter/memberCenter',
      pageTitle: '会员中心',
      role: 'normal',
      status: 1
    },
    {
      pageName: '搜索',
      pagePath: '/pages/search/search',
      pageTitle: '搜索',
      role: 'normal',
      status: 1
    },
    {
      pageName: '扫码',
      pagePath: '/pages/scanCode/scanCode',
      pageTitle: '扫码',
      role: 'normal',
      status: 1
    },
    {
      pageName: '设置',
      pagePath: '/pages/setting/setting',
      pageTitle: '设置',
      role: 'normal',
      status: 1
    },
    {
      pageName: '用户隐私协议',
      pagePath: '/pages/agreement/agreement',
      pageTitle: '用户隐私协议',
      role: 'normal',
      status: 1
    },
    {
      pageName: 'H5',
      pagePath: '/pages/webview/webview',
      pageTitle: 'H5',
      role: 'normal',
      status: 1
    }
  ]

  async createPage() {
    await this.clearTable()
    return await this.bulkCreate(this.pageList)
  }
}
