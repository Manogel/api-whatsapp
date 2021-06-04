import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

export enum EventTypes {
  QRCODE = 'qr-code',
  NEW_MESSAGE = 'new-message',
}

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: Server;

  emit(event: EventTypes, data: any, channel?: string) {
    if (channel) {
      this.server.to(channel).emit(event, data);
    } else {
      this.server.emit(event, data);
    }
  }

  broadcast(event: EventTypes, data: any) {
    this.emit(event, data);
  }
}
