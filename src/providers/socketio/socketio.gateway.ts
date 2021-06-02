import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SocketGateway');
  @SubscribeMessage('chat')
  handleEvent(@MessageBody() data: string): void {
    console.log(data);
  }

  async handleConnection(client: Socket) {
    const { id: idChannel } = client;
    const { user_id } = client.handshake.query;
    console.log('teste', user_id, idChannel);
  }

  afterInit(server: Server) {
    this.logger.log('init');
  }

  async handleDisconnect(client: Socket) {
    const { user_id } = client.handshake.query;
  }

  emit(event: string, data: any, channel?: string) {
    if (channel) {
      this.server.to(channel).emit(event, data);
    } else {
      this.server.emit(event, data);
    }
  }

  broadcast(event: string, data: any) {
    this.emit(event, data);
  }
}
