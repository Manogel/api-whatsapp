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

    // create({
    //   session: appConfig.appname,
    //   logQR: false,
    //   catchQR: this.onWaitQrCode,
    // })
    //   .then((client) => {
    //     this.client = client;
    //     this.socketGateway.broadcast('init', 'Sessão Criada');
    //     console.log('client');
    //   })
    //   .catch(() => {
    //     console.log('Erro ao criar instancia do whatsapp');
    //   });
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

    const response = await this.client.sendText(to, message);

    return response;
  }

  async sendFileMessage(data: SendMessageFileDto) {
    const { to, base64, filename } = data;
    const response = await this.client.sendFileFromBase64(to, base64, filename);

    return response;
  }

  async sendVideoAsGifMessage(data: SendMessageVideoAsGifDto) {
    const { to, base64, filename, subtitle } = data;
    const response = await this.client.sendVideoAsGifFromBase64(
      to,
      base64,
      filename,
      subtitle,
    );

    return response;
  }

  async sendImageMessage(data: SendMessageImageDto) {
    const { to, base64, filename } = data;
    const response = await this.client.sendImageFromBase64(
      to,
      base64,
      filename,
    );

    return response;
  }

  async sendVoiceMessage(data: SendMessageVoiceDto) {
    const { to, base64 } = data;
    const response = await this.client.sendVoiceBase64(to, base64);

    return response;
  }
}
