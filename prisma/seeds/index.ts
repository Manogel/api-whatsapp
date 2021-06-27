import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import seedBotMessages from './chatbotFlow';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Starting seed...');
  await seedBotMessages(prisma);
  console.log('Seed successful!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
