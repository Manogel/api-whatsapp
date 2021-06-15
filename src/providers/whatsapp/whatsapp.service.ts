import { getAsyncAppConfig } from '@config/app';
import { Injectable } from '@nestjs/common';
import {
  Whatsapp,
  create,
  CatchQR,
  Message,
  StatusFind,
  Contact,
} from 'venom-bot';
import {
  SendMessageVideoAsGifDto,
  SendMessageFileDto,
  SendMessageTextDto,
  SendMessageImageDto,
  SendMessageVoiceDto,
  SendFileDocumentDto,
} from './dtos/SendMessageDto';
import {} from 'wix-react-native-contacts';
import { SocketGateway } from '../socketio/socketio.gateway';
import { EventTypes } from '../socketio/dto/eventType.dto';
import { ReturnContactsDto } from './dtos/ReturnContactsDto';

@Injectable()
export class WhatsappService {
  client: Whatsapp = undefined;
  constructor(private readonly socketGateway: SocketGateway) {
    const appConfig = getAsyncAppConfig();

    create({
      session: appConfig.appname,
      logQR: true,
      catchQR: this.onWaitQrCode,
      statusFind: this.onGetStatus,
      autoClose: 90000,
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

  private onWaitQrCode: CatchQR = (base64Qr) => {
    this.socketGateway.broadcast(EventTypes.QR_CODE, base64Qr);
  };

  async showStatus() {
    const response = Promise.all([
      (await this.client.getHostDevice()).wid._serialized,
      await this.client.getBatteryLevel(),
      await this.client.isConnected(),
      await this.client.isLoggedIn(),
      await this.client.getWAVersion(),
    ]).then((values) => {
      const resp = {
        data: {
          status: {
            mode: 'MAIN',
            myNumber: values[0],
            batteryLevel: values[1],
            isPhoneConnected: values[2],
            isLoggedIn: values[3],
            waVersion: values[4],
          },
        },
      };
      return resp;
    });
    return response;
  }

  onGetStatus: StatusFind = (statusGet) => {
    this.socketGateway.broadcast(EventTypes.CONNECTION_STATUS, statusGet);

    return statusGet;
  };

  async listenOnMessage() {
    await this.client.onMessage(this.onMessage);
  }

  private onMessage(message: Message) {
    this.socketGateway.broadcast(EventTypes.NEW_MESSAGE, message);
  }

  async sendTextMessage(data: SendMessageTextDto) {
    this.isLogged();

    const { to, message } = data;
    const formattedNumber = this.handleNumber(to);

    const textMessage = await this.client.sendText(
      formattedNumber,
      message as string,
    );

    return textMessage;
  }

  async sendFileMessage(data: SendMessageFileDto) {
    this.isLogged();

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
    this.isLogged();

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
    this.isLogged();

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
    this.isLogged();

    const { to, path } = data;
    const formattedNumber = this.handleNumber(to);

    const voiceMessage = await this.client.sendVoice(formattedNumber, path);

    return voiceMessage;
  }

  async sendFileDocument(data: SendFileDocumentDto) {
    this.isLogged();

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
    this.isLogged();

    const contacts = await this.client.getAllContacts();

    return contacts;
  }

  async getContact(phoneNumber: string) {
    this.isLogged();

    const formattedNumber = this.handleNumber(phoneNumber);
    const contact = await this.client.getContact(formattedNumber);
    return contact;
  }

  private handleNumber(number: string) {
    const formattedNumber = `${number}@c.us`;
    return formattedNumber;
  }
  private isLogged() {
    if (!this.client) throw new Error('Whatsapp desconectado');
  }
}
