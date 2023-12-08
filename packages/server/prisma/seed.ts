import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const main = async () => {
  console.log('Start seeding ...')
  const isExists = await prisma.adminUser.findUnique({
    where: { username: 'admin' }
  })
  if (!isExists) {
    await prisma.adminUser.create({
      data: {
        username: 'admin',
        mobile: '18888888888',
        password:
          '345f6e158f1cff23.a1e6de188c81a24d350a110a34cec07886a1211fff4fcff2dd85f6ae82b4cf13'
      }
    })
  }
  console.log('Seeding finished.')
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
