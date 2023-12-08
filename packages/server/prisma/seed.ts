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
          '3d94a1cf84755aa8.745c0d35f596335a342e9c2d3e15956e9de0a6a95ce18beea58f864940dae96a\n'
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
