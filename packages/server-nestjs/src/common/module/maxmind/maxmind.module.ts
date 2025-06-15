import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MaxMindGeoIPService } from '@/common/services/maxmind-geoip.service'
import { MaxMindConfigService } from '@/config/maxmind.config'
import maxmindConfig from '@/config/maxmind.config'

/**
 * MaxMind模块
 * 提供IP地址地理位置解析服务
 */
@Module({
  imports: [ConfigModule.forFeature(maxmindConfig)],
  providers: [MaxMindConfigService, MaxMindGeoIPService],
  exports: [MaxMindGeoIPService],
})
export class MaxMindModule {}
