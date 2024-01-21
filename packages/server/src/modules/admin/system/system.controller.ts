import { Controller, Inject } from '@midwayjs/core'
import { SystemService } from './system.service'

@Controller('/admin/system')
export class SystemController {
  @Inject()
  systemService: SystemService
}
