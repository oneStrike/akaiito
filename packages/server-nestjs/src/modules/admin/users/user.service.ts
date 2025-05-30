import { Buffer } from 'node:buffer'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import * as svgCaptcha from 'svg-captcha'
import { v4 as uuid } from 'uuid'
import { PrismaService } from '@/global/services/prisma.service'
import { CacheKey } from '@/modules/admin/users/user.constant'
import { UserLoginDto } from './dto/user.dto'

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
      size: 4, // 验证码长度
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
    return {
      data: `data:image/svg+xml;base64,${Buffer.from(captcha.data).toString('base64')}`, // 使用引入的Buffer模块
      id: uniqueId,
    }
  }

  /**
   * 登录
   */

  async login(body: UserLoginDto) {
    // 检查用户输入的验证码
    if (!body.captcha) {
      throw new HttpException('请输入验证码', HttpStatus.BAD_REQUEST)
    }
    const captchaText = await this.cacheManager.get(
      CacheKey.CAPTCHA + body.captchaId,
    )
    // 检查验证码是否存在于缓存中
    if (!captchaText) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST)
    }

    // 验证码比较（不区分大小写）
    if (
      String(captchaText).toLowerCase() !== String(body.captcha).toLowerCase()
    ) {
      await this.cacheManager.del(CacheKey.CAPTCHA + body.captchaId)
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST)
    }
    // 验证通过后，删除已使用的验证码
    await this.cacheManager.del(CacheKey.CAPTCHA + body.captchaId)
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
