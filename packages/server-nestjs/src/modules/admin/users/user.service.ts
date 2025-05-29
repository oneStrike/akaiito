import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/global/services/prisma.service'

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
