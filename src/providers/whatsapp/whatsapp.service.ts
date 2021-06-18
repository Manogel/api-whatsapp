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
        this.client.onMessage((message) => {
          this.onMessage(message);
        });
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
    const getHostDevice = await this.client.getHostDevice();
    const response = await Promise.all([
      getHostDevice.wid._serialized,
      this.client.getBatteryLevel(),
      this.client.isConnected(),
      this.client.isLoggedIn(),
      this.client.getWAVersion(),
    ]);
    const resp = {
      data: {
        status: {
          mode: 'MAIN',
          myNumber: response[0],
          batteryLevel: response[1],
          isPhoneConnected: response[2],
          isLoggedIn: response[3],
          waVersion: response[4],
        },
      },
    };

    return resp;
  }

  private onGetStatus: StatusFind = (statusGet) => {
    this.socketGateway.broadcast(EventTypes.CONNECTION_STATUS, statusGet);

    return statusGet;
  };

  private onMessage(message: Message) {
    this.socketGateway.broadcast(EventTypes.NEW_MESSAGE, message);
  }

  async sendTextMessage(data: SendMessageTextDto) {
    this.verifyHasLogged();

    const { to, message } = data;
    const formattedNumber = this.handleNumber(to);

    const textMessage = await this.client.sendText(
      formattedNumber,
      message as string,
    );

    return textMessage;
  }

  async sendFileMessage(data: SendMessageFileDto) {
    this.verifyHasLogged();

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
    this.verifyHasLogged();

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
    this.verifyHasLogged();

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
    this.verifyHasLogged();

    const { to, path } = data;
    const formattedNumber = this.handleNumber(to);

    const voiceMessage = await this.client.sendVoice(formattedNumber, path);

    return voiceMessage;
  }

  async sendFileDocument(data: SendFileDocumentDto) {
    this.verifyHasLogged();

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
    this.verifyHasLogged();

    const contacts = await this.client.getAllContacts();

    return contacts;
  }

  async getContact(phoneNumber: string) {
    this.verifyHasLogged();

    const formattedNumber = this.handleNumber(phoneNumber);
    const contact = await this.client.getContact(formattedNumber);
    return contact;
  }

  private handleNumber(number: string) {
    const formattedNumber = `${number}@c.us`;
    return formattedNumber;
  }
  private verifyHasLogged() {
    if (!this.client) throw new Error('Whatsapp desconectado');
  }
}
