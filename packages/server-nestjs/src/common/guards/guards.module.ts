import { Module } from '@nestjs/common'
import { SmartJwtAuthGuard } from './smart-jwt-auth.guard'

/**
 * GuardsModule 守卫模块
 * 管理所有自定义守卫的依赖注入
 */
@Module({
  providers: [SmartJwtAuthGuard],
  exports: [SmartJwtAuthGuard],
})
export class GuardsModule {}