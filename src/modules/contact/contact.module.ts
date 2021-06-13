import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { WhatsappModule } from '@providers/whatsapp/whatsapp.module';
import { PrismaModule } from '@providers/prisma/prisma.module';
import { ContactRepository } from './contact.repository';

@Module({
  imports: [WhatsappModule, PrismaModule],
  controllers: [ContactController],
  providers: [ContactService, ContactRepository],
})
export class ContactModule {}
