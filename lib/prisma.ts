import {PrismaClient} from "@prisma/client";


const globalForPrisma = globalThis as unknown as {prisma: PrismaClient}

export const prisma = new PrismaClient() || globalForPrisma.prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma