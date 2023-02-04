import { Inject, Provide } from '@midwayjs/core'
import { BaseService } from '../shared/service/base.service'
import { InfoService } from '@midwayjs/info'
import { BaseMapping } from '../shared/mapping/base.mapping'

@Provide()
export class SystemService extends BaseService {
  @Inject()
  infoService: InfoService

  @Inject()
  mapping: BaseMapping

  /**
   * 获取系统基本信息
   */
  async getSystemInfo() {
    const { Platform, Node, V8 } = this.infoService.systemInfo().info
    const { Current, Uptime } = this.infoService.timeInfo().info
    const resourceOccupationInfo =
      this.infoService.resourceOccupationInfo().info
    return {
      platform: Platform,
      node: Node,
      v8: V8,
      serverTime: Current,
      Uptime,
      cpu: resourceOccupationInfo['CPU'],
      cpuUsage: resourceOccupationInfo['CPU Usage'],
      ...this.utils.systemUtil.memory(),
      ...(await this.utils.systemUtil.disk())
    }
  }
}
