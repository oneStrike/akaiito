import type { PrismaService } from '@/core/database/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return {
      pageIndex: 1,
      pageSize: 15,
      total: 100,
      items: await this.prisma.adminUser.findMany(),
    }
  }
}
