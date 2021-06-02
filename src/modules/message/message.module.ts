import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.contoller';
import { WhatsappModule } from '../../providers/whatsapp/whatsapp.module';

@Module({
  imports: [WhatsappModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
