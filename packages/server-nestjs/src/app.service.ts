import { Injectable } from '@nestjs/common';
import { PrismaService } from './prosma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello() {
    return this.prisma.appUser.findMany();
  }
}
