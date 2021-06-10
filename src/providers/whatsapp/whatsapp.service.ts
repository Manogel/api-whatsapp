import { getAsyncAppConfig } from '@config/app';
import { Injectable } from '@nestjs/common';
import { Whatsapp, create, CatchQR, Message, StatusFind } from 'venom-bot';
import {
  SendMessageVideoAsGifDto,
  SendMessageFileDto,
  SendMessageTextDto,
  SendMessageImageDto,
  SendMessageVoiceDto,
  SendFileDocumentDto,
} from './dtos/SendMessageDto';
import { SocketGateway } from '../socketio/socketio.gateway';
import { EventTypes } from '../socketio/dto/eventType.dto';

@Injectable()
export class WhatsappService {
  private client: Whatsapp;

  constructor(private readonly socketGateway: SocketGateway) {
    const appConfig = getAsyncAppConfig();

    create({
      session: appConfig.appname,
      logQR: true,
      catchQR: this.onWaitQrCode,
      statusFind: this.onGetStatus,
    })
      .then((client) => {
        this.client = client;

        process.on('SIGINT', function () {
          client.close();
        });
      })
      .catch(() => {
        console.log('Erro ao criar instancia do whatsapp');
      });
  }

  private onWaitQrCode: CatchQR = (qrCode) => {
    this.socketGateway.broadcast(EventTypes.QR_CODE, qrCode);
  };

  onGetStatus: StatusFind = (statusGet) => {
    this.socketGateway.broadcast(EventTypes.CONNECTION_STATUS, statusGet);
  };

  async listenOnMessage() {
    await this.client.onMessage(this.onMessage);
  }

  private onMessage(message: Message) {
    this.socketGateway.broadcast(EventTypes.NEW_MESSAGE, message);
  }

  async sendTextMessage(data: SendMessageTextDto) {
    const isLogged = this.isLogged();
    if (isLogged) {
      return { error: 'Whatsapp desconectado' };
    }
    const { to, message } = data;
    const formattedNumber = this.handleNumber(to);

    const textMessage = await this.client.sendText(
      formattedNumber,
      message as string,
    );

    return textMessage;
  }

  async sendFileMessage(data: SendMessageFileDto) {
    const isLogged = this.isLogged();
    if (isLogged) {
      return { error: 'Whatsapp desconectado' };
    }
    const { to, path, filename } = data;
    const formattedNumber = this.handleNumber(to);

    const fileMessage = await this.client.sendFile(
      formattedNumber,
      path,
      filename,
    );

    return fileMessage;
  }

  async sendVideoMessage(data: SendMessageVideoAsGifDto) {
    const isLogged = this.isLogged();
    if (isLogged) {
      return { error: 'Whatsapp desconectado' };
    }
    const { to, path, filename, subtitle } = data;
    const formattedNumber = this.handleNumber(to);

    const videoMessage = await this.client.sendVideoAsGif(
      formattedNumber,
      path,
      filename,
      subtitle,
    );

    return videoMessage;
  }

  async sendImageMessage(data: SendMessageImageDto) {
    const isLogged = this.isLogged();
    if (isLogged) {
      return { error: 'Whatsapp desconectado' };
    }
    const { to, path, filename } = data;
    const formattedNumber = this.handleNumber(to);

    const imageMessage = await this.client.sendImage(
      formattedNumber,
      path,
      filename,
    );

    return imageMessage;
  }

  async sendVoiceMessage(data: SendMessageVoiceDto) {
    const isLogged = this.isLogged();
    if (isLogged) {
      return { error: 'Whatsapp desconectado' };
    }
    const { to, path } = data;
    const formattedNumber = this.handleNumber(to);

    const voiceMessage = await this.client.sendVoice(formattedNumber, path);

    return voiceMessage;
  }

  async sendFileDocument(data: SendFileDocumentDto) {
    const isLogged = this.isLogged();
    if (isLogged) {
      return { error: 'Whatsapp desconectado' };
    }
    const { to, path, filename, subtitle } = data;
    const formattedNumber = this.handleNumber(to);

    const fileDocument = await this.client.sendFile(
      formattedNumber,
      path,
      filename,
      subtitle,
    );

    return fileDocument;
  }
  async getContactList() {
    const isLogged = this.isLogged();
    if (isLogged) {
      return { error: 'Whatsapp desconectado' };
    }
    const contacts = await this.client.getAllContacts();
    return contacts;
  }

  async getContact(phoneNumber: string) {
    const isLogged = this.isLogged();
    if (isLogged) {
      return { error: 'Whatsapp desconectado' };
    }
    const formattedNumber = this.handleNumber(phoneNumber);
    const contact = await this.client.getContact(formattedNumber);
    return contact;
  }

  private handleNumber(number: string) {
    const formattedNumber = `${number}@c.us`;
    return formattedNumber;
  }
  private isLogged() {
    if (!this.client) return true;
  }
}
