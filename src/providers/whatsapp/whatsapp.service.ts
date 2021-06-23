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
import { ReceiveMessageDto } from './dtos/ReceiveMessageDto';
import * as fs from 'fs';
import { resolve } from 'path';
import crypto from 'crypto';

@Injectable()
export class WhatsappService {
  private client: Whatsapp = undefined;
  private appConfig = getAsyncAppConfig();
  constructor(private readonly socketGateway: SocketGateway) {
    const appConfig = getAsyncAppConfig();

    create({
      session: appConfig.appname,
      logQR: true,
      catchQR: this.onWaitQrCode,
      statusFind: this.onGetStatus,
      autoClose: 0,
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
      mode: 'MAIN',
      myNumber: this.handleNumberToDefaultFormat(response[0]),
      batteryLevel: response[1],
      isPhoneConnected: response[2],
      isLoggedIn: response[3],
      waVersion: response[4],
    };

    return resp;
  }

  private onGetStatus: StatusFind = (statusGet) => {
    this.socketGateway.broadcast(EventTypes.CONNECTION_STATUS, statusGet);

    return statusGet;
  };

  private async onMessage(message: Message) {
    let formattedMessage: ReceiveMessageDto;
    if (['image', 'document', 'ptt', 'audio', 'video'].includes(message.type)) {
      const urlFile = await this.decriptFileSent(message);
      formattedMessage = {
        id: message.id,
        fromId: message.from,
        quotedMessageId: message.quotedMsgObj,
        // message.quotedMsgObj === null
        //   ? message.quotedMsgObj
        //   : message.quotedMsgObj.id,
        message: {
          isFromMe: message.fromMe,
          text: message.body,
          timestamp: message.timestamp.toString(),
          type: message.type,
          file: {
            url: urlFile,
            name: message.filename,
            mimetype: message.mimetype,
            publicFilename: message.filename,
            subtitle: message.caption,
          },
        },
        from: {
          id: message.sender.id,
          name: message.sender.name,
          alternativeName: message.sender.shortName,
          number: this.handleNumberToDefaultFormat(message.from),
        },
      };
      this.socketGateway.broadcast(EventTypes.NEW_MESSAGE, formattedMessage);
    } else {
      formattedMessage = {
        id: message.id,
        fromId: message.from,
        quotedMessageId: message.quotedMsgObj,
        // message.quotedMsgObj === null
        //   ? message.quotedMsgObj
        //   : message.quotedMsgObj?.id,
        message: {
          isFromMe: message.fromMe,
          text: message.body,
          timestamp: message.timestamp.toString(),
          type: message.type,
        },
        from: {
          id: message.sender.id,
          name: message.sender.name,
          alternativeName: message.sender.shortName,
          number: this.handleNumberToDefaultFormat(message.from),
        },
      };
      this.socketGateway.broadcast(EventTypes.NEW_MESSAGE, formattedMessage);
    }
  }

  async sendTextMessage(data: SendMessageTextDto) {
    this.verifyHasLogged();

    const { to, message } = data;
    const formattedNumber = this.handleNumberToWhatsappFormat(to);

    const textMessage = await this.client.sendText(
      formattedNumber,
      message as string,
    );

    return textMessage;
  }

  async sendFileMessage(data: SendMessageFileDto) {
    this.verifyHasLogged();

    const { to, path, filename } = data;
    const formattedNumber = this.handleNumberToWhatsappFormat(to);

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
    const formattedNumber = this.handleNumberToWhatsappFormat(to);

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
    const formattedNumber = this.handleNumberToWhatsappFormat(to);

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
    const formattedNumber = this.handleNumberToWhatsappFormat(to);

    const voiceMessage = await this.client.sendVoice(formattedNumber, path);

    return voiceMessage;
  }

  async sendFileDocument(data: SendFileDocumentDto) {
    this.verifyHasLogged();

    const { to, path, filename, subtitle } = data;
    const formattedNumber = this.handleNumberToWhatsappFormat(to);

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

    const formattedNumber = this.handleNumberToWhatsappFormat(phoneNumber);
    const contact = await this.client.getContact(formattedNumber);
    return contact;
  }

  private handleNumberToWhatsappFormat(number: string) {
    const formattedNumber = `${number}@c.us`;
    return formattedNumber;
  }
  private handleNumberToDefaultFormat(number: string) {
    const formattedNumber = number.split('@').shift();
    return formattedNumber;
  }
  private verifyHasLogged() {
    if (!this.client) throw new Error('Whatsapp desconectado');
  }

  private async decriptFileSent(message: Message): Promise<string> {
    const buffer = await this.client.decryptFile(message);

    const filehash = crypto.randomBytes(10).toString('hex');
    const filename = `${filehash}-${Date.now()}.${message.mimetype
      .split('/')
      .pop()}`;
    const uploadsFolderPath = resolve(__dirname, '..', '..', '..', '..', 'tmp');
    fs.writeFile(uploadsFolderPath + '/uploads/' + filename, buffer, (err) => {
      if (err) {
        throw new Error('Falha na decriptação do arquivo');
      }
    });
    return `${this.appConfig.appURL}/files/${filename}`;
  }
}
