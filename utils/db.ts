import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// 1. Connection Pool setup karein (Pg pooler)
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 2. Singleton function banayein
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

// 3. Global type define karein taake TypeScript khush rahe
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// 4. Check karein ke kya pehle se connection mojood hai?
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

// 5. Agar Development mode hai, toh connection ko global save kar lein
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
