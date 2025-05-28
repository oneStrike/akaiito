import * as process from 'node:process'
import { PrismaClient } from '../prisma'
import { createInitialAdminAccount } from './adminUser'
import { createInitialDataDictionary } from './dataDictionary'
import { createInitialWorkCategory } from './workCategory'

const prisma = new PrismaClient()

Promise.all([
  createInitialAdminAccount(prisma),
  createInitialDataDictionary(prisma),
  createInitialWorkCategory(prisma),
])
  .catch(() => process.exit(1))
  .finally(() => prisma.$disconnect())
