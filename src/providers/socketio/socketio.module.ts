import { Module } from '@nestjs/common';
import { SocketGateway } from './socketio.gateway';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
@Module({
  imports: [WhatsappModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketioModule {}
