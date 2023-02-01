import { Controller, Inject } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
import Util from '../../utils'
@Controller()
export abstract class BaseController {
  @Inject()
  protected ctx: Context

  @Inject()
  protected utils: Util
}
