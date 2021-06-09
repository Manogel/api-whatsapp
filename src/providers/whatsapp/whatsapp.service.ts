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
    const { to, message } = data;
    const formattedNumber = this.handleNumber(to);
    try {
      const textMessage = await this.client.sendText(
        formattedNumber,
        message as string,
      );

      return textMessage;
    } catch (error) {
      return { error: 'Conecte o whatsapp' };
    }
  }

  async sendFileMessage(data: SendMessageFileDto) {
    const { to, path, filename } = data;
    const formattedNumber = this.handleNumber(to);
    try {
      const fileMessage = await this.client.sendFile(
        formattedNumber,
        path,
        filename,
      );

      return fileMessage;
    } catch (error) {
      return { error: 'Conecte o whatsapp' };
    }
  }

  async sendVideoMessage(data: SendMessageVideoAsGifDto) {
    const { to, path, filename, subtitle } = data;
    const formattedNumber = this.handleNumber(to);
    try {
      const videoMessage = await this.client.sendVideoAsGif(
        formattedNumber,
        path,
        filename,
        subtitle,
      );

      return videoMessage;
    } catch (error) {
      return { error: 'Conecte o whatsapp' };
    }
  }

  async sendImageMessage(data: SendMessageImageDto) {
    const { to, path, filename } = data;
    const formattedNumber = this.handleNumber(to);
    try {
      const imageMessage = await this.client.sendImage(
        formattedNumber,
        path,
        filename,
      );

      return imageMessage;
    } catch (error) {
      return { error: 'Conecte o whatsapp' };
    }
  }

  async sendVoiceMessage(data: SendMessageVoiceDto) {
    const { to, path } = data;
    const formattedNumber = this.handleNumber(to);
    try {
      const voiceMessage = await this.client.sendVoice(formattedNumber, path);

      return voiceMessage;
    } catch (error) {
      return { error: 'Conecte o whatsapp' };
    }
  }

  async sendFileDocument(data: SendFileDocumentDto) {
    const { to, path, filename, subtitle } = data;
    const formattedNumber = this.handleNumber(to);
    try {
      const fileDocument = await this.client.sendFile(
        formattedNumber,
        path,
        filename,
        subtitle,
      );

      return fileDocument;
    } catch (error) {
      return { error: 'Conecte o whatsapp' };
    }
  }
  async getContactList() {
    try {
      const contacts = await this.client.getAllContacts();
      return contacts;
    } catch (error) {
      return { error: 'Conecte o whatsapp' };
    }
  }

  async getContact(phoneNumber: string) {
    try {
      const formattedNumber = this.handleNumber(phoneNumber);
      const contact = await this.client.getContact(formattedNumber);
      return contact;
    } catch (error) {
      return { error: 'Conecte o whatsapp' };
    }
  }

  private handleNumber(number: string) {
    const formattedNumber = `${number}@c.us`;
    return formattedNumber;
  }
}
