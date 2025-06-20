import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/global/services/prisma.service'

@Injectable()
export class ClientUserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.adminUser.findMany()
  }
}
