import { Module } from '@nestjs/common';
import { WhatsappConService } from './whatsappCon.service';
import { WhatsappConController } from './whatsappCon.controller';
import { WhatsappModule } from '@providers/whatsapp/whatsapp.module';

@Module({
  imports: [WhatsappModule],
  controllers: [WhatsappConController],
  providers: [WhatsappConService],
  exports: [WhatsappConService],
})
export class WhatsappConModule {}
