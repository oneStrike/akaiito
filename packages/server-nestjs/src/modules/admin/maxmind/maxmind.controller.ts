import { Controller, Get, Post, Logger, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { MaxMindGeoIPService } from '../../../common/services/maxmind-geoip.service'

/**
 * MaxMind GeoIP管理控制器
 * 提供MaxMind数据库管理相关的API接口
 */
@ApiTags('MaxMind GeoIP管理')
@Controller('admin/maxmind')
export class MaxMindController {
  private readonly logger = new Logger(MaxMindController.name)

  constructor(private readonly maxMindGeoIPService: MaxMindGeoIPService) {}

  /**
   * 获取MaxMind数据库状态信息
   */
  @Get('status')
  @ApiOperation({ summary: '获取MaxMind数据库状态' })
  @ApiResponse({ status: 200, description: '获取成功' })
  getDatabaseStatus() {
    try {
      const dbInfo = this.maxMindGeoIPService.getDatabaseInfo()
      return {
        code: 200,
        message: '获取成功',
        data: {
          ...dbInfo,
          status: dbInfo.exists ? '正常' : '未初始化',
        },
      }
    } catch (error) {
      this.logger.error('获取MaxMind数据库状态失败', error.stack)
      return {
        code: 500,
        message: '获取失败',
        data: null,
      }
    }
  }

  /**
   * 手动更新MaxMind数据库
   */
  @Post('update')
  @ApiOperation({ summary: '手动更新MaxMind数据库' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 500, description: '更新失败' })
  async updateDatabase() {
    try {
      this.logger.log('开始手动更新MaxMind数据库')
      await this.maxMindGeoIPService.updateDatabase()
      
      return {
        code: 200,
        message: 'MaxMind数据库更新成功',
        data: null,
      }
    } catch (error) {
      this.logger.error('手动更新MaxMind数据库失败', error.stack)
      return {
        code: 500,
        message: `更新失败: ${error.message}`,
        data: null,
      }
    }
  }

  /**
   * 测试IP地址解析
   */
  @Get('test/:ip')
  @ApiOperation({ summary: '测试IP地址解析' })
  @ApiParam({ name: 'ip', description: 'IP地址', example: '8.8.8.8' })
  @ApiResponse({ status: 200, description: '解析成功' })
  async testIpResolution(@Param('ip') ip: string) {
    try {
      const geoLocation = await this.maxMindGeoIPService.getGeoLocation(ip)
      
      return {
        code: 200,
        message: '解析成功',
        data: {
          ip,
          ...geoLocation,
        },
      }
    } catch (error) {
      this.logger.error(`测试IP地址解析失败: ${ip}`, error.stack)
      return {
        code: 500,
        message: `解析失败: ${error.message}`,
        data: null,
      }
    }
  }
}