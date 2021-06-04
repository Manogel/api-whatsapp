import { getAsyncAppConfig } from '@config/app';
import { Injectable } from '@nestjs/common';
import { Whatsapp, create, CatchQR, Message } from 'venom-bot';
import {
  SendMessageVideoAsGifDto,
  SendMessageFileDto,
  SendMessageTextDto,
  SendMessageImageDto,
  SendMessageVoiceDto,
} from './dtos/SendMessageDto';
import { EventTypes, SocketGateway } from '../socketio/socketio.gateway';

@Injectable()
export class WhatsappService {
  private client: Whatsapp;

  constructor(private readonly socketGateway: SocketGateway) {
    const appConfig = getAsyncAppConfig();

    create({
      session: appConfig.appname,
      logQR: true,
      catchQR: this.onWaitQrCode,
    })
      .then((client) => {
        this.client = client;
        //this.socketGateway.broadcast('init', 'Sessão Criada');
        console.log('client');
        process.on('SIGINT', function () {
          client.close();
        });
      })
      .catch(() => {
        console.log('Erro ao criar instancia do whatsapp');
      });
  }

  onWaitQrCode: CatchQR = (qrCode) => {
    this.socketGateway.broadcast(
      EventTypes.QRCODE,
      'Aguardando leitura do QRCode',
    );
    console.log('qrCode');
  };

  async listenOnMessage() {
    await this.client.onMessage(this.onMessage);
  }

  onMessage(message: Message) {
    // this.socketGateway.broadcast('newMsg', message);
    console.log('received message');
    console.log(message);
  }

  async sendTextMessage(data: SendMessageTextDto) {
    const { to, message } = data;
    console.log('et', to, message);
    const response = await this.client
      .sendText(to, message as string)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    return response;
  }

  async sendFileMessage(data: SendMessageFileDto) {
    const { to, path, filename } = data;
    const response = await this.client.sendFile(to, path, filename);

    return response;
  }

  async sendVideoAsGifMessage(data: SendMessageVideoAsGifDto) {
    const { to, path, filename, subtitle } = data;
    const response = await this.client.sendVideoAsGif(
      to,
      path,
      filename,
      subtitle,
    );

    return response;
  }

  async sendImageMessage(data: SendMessageImageDto) {
    const { to, path, filename } = data;
    const response = await this.client.sendImage(to, path, filename);

    return response;
  }

  async sendVoiceMessage(data: SendMessageVoiceDto) {
    const { to, path } = data;
    const response = await this.client.sendVoice(to, path);

    return response;
  }
}
