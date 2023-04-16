import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.$connect()
  .then(() => console.info('💎 Connected to database via Prisma'))
  .catch(() => console.warn('⚠️ Warning, cannot connect to the database, this may cause issues'))

export default prisma
