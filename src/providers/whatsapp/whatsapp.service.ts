import { getAsyncAppConfig } from '@config/app';
import { Injectable } from '@nestjs/common';
import { Whatsapp, create, CatchQR, Message } from 'venom-bot';
import { SendFileMessageDto } from './dtos/SendFileMessageDto';
import { SendTextMessageDto } from './dtos/SendTextMessageDto';
import { SendVoiceMessageDto } from './dtos/SendVoiceMessageDto';
import { SendVideoMessageDto } from './dtos/SendVideoMessageDto';
import { response } from 'express';

@Injectable()
export class WhatsappService {
  private client: Whatsapp;

  constructor() {
    const appConfig = getAsyncAppConfig();

    create({
      session: appConfig.appname,
      logQR: true,
      catchQR: this.onWaitQrCode,
    })
      .then((client) => {
        this.client = client;
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

  async sendVideoMessage(data: SendVideoMessageDto) {
    const { to, base64, filename, caption } = data;
    const response = await this.client.sendVideoAsGifFromBase64(
      to,
      base64,
      filename,
      caption,
    );

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
    console.log(typeof base64);
    const mime = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    console.log(mime, 'wwwww', mime.length);
    await this.client
      .sendVoiceBase64(to, base64)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //return response;
  }
}
