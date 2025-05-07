import * as process from 'node:process'
import { PrismaClient } from '@prisma/client'
import { createInitialAdminAccount } from './adminUser'
import { createInitialDataDictionary } from './dataDictionary'

const prisma = new PrismaClient()


Promise.all([createInitialAdminAccount(prisma), createInitialDataDictionary(prisma)])
  .catch(() => process.exit(1))
  .finally(() => prisma.$disconnect())
