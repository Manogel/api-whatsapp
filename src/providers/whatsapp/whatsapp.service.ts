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

  onWaitQrCode: CatchQR = (qrCode) => {
    this.socketGateway.broadcast(EventTypes.QR_CODE, qrCode);
  };

  onGetStatus: StatusFind = (statusGet) => {
    this.socketGateway.broadcast(EventTypes.CONNECTION_STATUS, statusGet);
  };

  async listenOnMessage() {
    await this.client.onMessage(this.onMessage);
  }

  onMessage(message: Message) {
    this.socketGateway.broadcast(EventTypes.NEW_MESSAGE, message);
  }

  async sendTextMessage(data: SendMessageTextDto) {
    const { to, message } = data;
    const formattedNumber = this.handleNumber(to);
    const response = await this.client.sendText(
      formattedNumber,
      message as string,
    );

    return response;
  }

  async sendFileMessage(data: SendMessageFileDto) {
    const { to, path, filename } = data;
    const formattedNumber = this.handleNumber(to);
    const response = await this.client.sendFile(
      formattedNumber,
      path,
      filename,
    );

    return response;
  }

  async sendVideoMessage(data: SendMessageVideoAsGifDto) {
    const { to, path, filename, subtitle } = data;
    const formattedNumber = this.handleNumber(to);
    const response = await this.client.sendVideoAsGif(
      formattedNumber,
      path,
      filename,
      subtitle,
    );

    return response;
  }

  async sendImageMessage(data: SendMessageImageDto) {
    const { to, path, filename } = data;
    const formattedNumber = this.handleNumber(to);
    const response = await this.client.sendImage(
      formattedNumber,
      path,
      filename,
    );

    return response;
  }

  async sendVoiceMessage(data: SendMessageVoiceDto) {
    const { to, path } = data;
    const formattedNumber = this.handleNumber(to);
    const response = await this.client.sendVoice(formattedNumber, path);

    return response;
  }

  async sendFileDocument(data: SendFileDocumentDto) {
    const { to, path, filename, subtitle } = data;
    const formattedNumber = this.handleNumber(to);
    const response = await this.client.sendFile(
      formattedNumber,
      path,
      filename,
      subtitle,
    );

    return response;
  }
  async getContactList() {
    const contacts = await this.client.getAllContacts();
    return contacts;
  }

  async getContact(phoneNumber: string) {
    const formattedNumber = this.handleNumber(phoneNumber);
    const contact = await this.client.getContact(formattedNumber);
    return contact;
  }

  private handleNumber(number: string) {
    const formattedNumber = `${number}@c.us`;
    return formattedNumber;
  }
}
