import type { PrismaClient } from '@/prisma/client'

export async function createInitialWorkCategory(prisma: PrismaClient) {
  const initData = [
    {
      name: '百合',
      photoApplicable: true,
      novelApplicable: true,
      comicApplicable: true,
      illustratorApplicable: true,
    },
    {
      name: '热血',
      photoApplicable: true,
      novelApplicable: true,
      comicApplicable: true,
      illustratorApplicable: true,
    },
    {
      name: '温馨',
      photoApplicable: true,
      novelApplicable: true,
      comicApplicable: true,
      illustratorApplicable: true,
    },
    {
      name: '校园',
      photoApplicable: true,
      novelApplicable: true,
      comicApplicable: true,
      illustratorApplicable: true,
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
