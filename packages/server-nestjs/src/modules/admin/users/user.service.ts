import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { PrismaService } from '@/global/services/prisma.service'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getUsers() {
    const testKey = 't1estRedisConnection'
    const testValue = 'testValue'

    console.log(123)
    // 尝试设置缓存
    await this.cacheManager.set(testKey, testValue)
    // 尝试获取缓存
    console.log(123)
    const retrievedValue = await this.cacheManager.get(testKey)
    console.log(retrievedValue)
    return {
      pageIndex: 1,
      pageSize: 15,
      total: 100,
      items: await this.prisma.adminUser.findMany(),
    }
  }
}
