import type { Cache } from 'cache-manager'
import type { UserLoginDto } from './dto/user.dto'
import type { PrismaService } from '@/global/services/prisma.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import * as svgCaptcha from 'svg-captcha'
import { v4 as uuid } from 'uuid'
import { CacheKey } from '@/modules/admin/users/user.constant'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * 获取验证码
   */
  async getCaptcha() {
    const captcha = svgCaptcha.create({
      size: 6, // 验证码长度
      ignoreChars: '0o1i', // 排除 0o1i
      noise: 2, // 噪声线条数量
      color: true, // 验证码的字符有颜色，而不是黑白
    })
    const uniqueId = uuid()
    await this.cacheManager.set(
      CacheKey.CAPTCHA + uniqueId,
      captcha.text,
      1000 * 60,
    )
    console.log(uniqueId)
    return {
      data: captcha.data,
      id: uniqueId, // 转换为小写或进行其他处理
    }
  }

  /**
   * 登录
   */

  async login(body: UserLoginDto) {
    console.log('🚀 ~ UserService ~ login ~ body:', body)
    return body
  }

  async getUsers() {
    return {
      pageIndex: 1,
      pageSize: 15,
      total: 100,
      items: await this.prisma.adminUser.findMany(),
    }
  }
}
