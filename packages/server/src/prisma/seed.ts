import * as process from 'node:process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const isExists = await prisma.adminUser.findUnique({
    where: { mobile: '18888888888' },
  })
  if (!isExists) {
    await prisma.adminUser.create({
      data: {
        username: 'admin',
        mobile: '18888888888',
        isRoot: true,
        status: true,
        password: '345f6e158f1cff23.a1e6de188c81a24d350a110a34cec07886a1211fff4fcff2dd85f6ae82b4cf13',
      },
    })
  }
}

main()
  .catch(() => process.exit(1))
  .finally(() => prisma.$disconnect())
