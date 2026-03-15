import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
// Yaad rakhein, import wahan se karein jahan humne output set kiya tha
import products from './products.json'; // Aapka JSON data
import { PrismaClient } from '@/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding started... ⏳');

  for (const product of products) {
    // upsert use karna behtar hai taake agar data pehle se ho toh error na aaye
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Seeding complete! ✅');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
