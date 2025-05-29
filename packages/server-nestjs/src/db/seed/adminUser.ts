import type { PrismaClient } from '@prisma/client'

export async function createInitialAdminAccount(prisma: PrismaClient) {
  const accountInfo = {
    username: 'admin',
    mobile: '18888888888',
    isRoot: true,
    status: true,
    password:
      '345f6e158f1cff23.a1e6de188c81a24d350a110a34cec07886a1211fff4fcff2dd85f6ae82b4cf13',
  }
  await prisma.adminUser.upsert({
    where: { username: accountInfo.username },
    update: accountInfo,
    create: accountInfo,
  })
}
