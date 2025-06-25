import * as process from 'node:process'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../client/client'
import { createInitialAdminAccount } from './adminUser'
import { createInitialDataDictionary } from './dataDictionary'
import { createInitialWorkCategory } from './workCategory'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })

Promise.all([
  createInitialAdminAccount(prisma),
  createInitialDataDictionary(prisma),
  createInitialWorkCategory(prisma),
])
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
