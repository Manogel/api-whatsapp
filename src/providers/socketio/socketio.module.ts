import { Module } from '@nestjs/common';
import { SocketGateway } from './socketio.gateway';

@Module({
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketioModule {}
