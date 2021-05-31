import { getAsyncAppConfig } from '@config/app';
import { Injectable } from '@nestjs/common';
import { Whatsapp, create, CatchQR, Message } from 'venom-bot';
import { SendFileMessageDto } from './dtos/SendFileMessageDto';
import { SendTextMessageDto } from './dtos/SendTextMessageDto';
import { SendVoiceMessageDto } from './dtos/SendVoiceMessageDto';

@Injectable()
export class WhatsappService {
  private client: Whatsapp;

  constructor() {
    const appConfig = getAsyncAppConfig();

    create({
      session: appConfig.appname,
      logQR: false,
      catchQR: this.onWaitQrCode,
    })
      .then((client) => {
        this.client = client;
        console.log('client');
      })
      .catch(() => {
        console.log('Erro ao criar instancia do whatsapp');
      });
  }

  onWaitQrCode: CatchQR = (qrCode) => {
    console.log('qrCode');
  };

  async listenOnMessage() {
    await this.client.onMessage(this.onMessage);
  }

  onMessage(message: Message) {
    console.log('received message');
    console.log(message);
  }

  async sendTextMessage(data: SendTextMessageDto) {
    const { to, message } = data;
    const response = await this.client.sendText(to, message);

    return response;
  }

  async sendFileMessage(data: SendFileMessageDto) {
    const { to, base64, filename } = data;
    const response = await this.client.sendFileFromBase64(to, base64, filename);

    return response;
  }

  async sendImageMessage(data: SendFileMessageDto) {
    const { to, base64, filename } = data;
    const response = await this.client.sendImageFromBase64(
      to,
      base64,
      filename,
    );

    return response;
  }

  async sendVoiceMessage(data: SendVoiceMessageDto) {
    const { to, base64 } = data;
    const response = await this.client.sendVoiceBase64(to, base64);

    return response;
  }
}
