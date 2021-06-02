import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { SocketioModule } from '../socketio/socketio.module';
@Module({
  imports: [SocketioModule],
  providers: [WhatsappService],
  exports: [WhatsappService],
})
export class WhatsappModule {}
