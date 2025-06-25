import type { PrismaClient } from '../client/client'

export async function createInitialWorkCategory(prisma: PrismaClient) {
  const initData = [
    {
      name: '百合',
      contentTypes: 15,
    },
    {
      name: '热血',
      contentTypes: 15,
    },
    {
      name: '温馨',
      contentTypes: 15,
    },
    {
      name: '校园',
      contentTypes: 15,
    },
  ]
  for (const item of initData) {
    await prisma.workCategory.upsert({
      where: { name: item.name },
      update: item,
      create: item,
    })
  }
}
