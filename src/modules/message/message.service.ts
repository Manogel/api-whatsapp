import { Injectable } from '@nestjs/common';
import { WhatsappService } from '../../providers/whatsapp/whatsapp.service';
import { SendMessageFileDto } from './dto/send-message-file.dto';
import * as mime from 'mime-types';
import * as filetype from 'file-type';
import { SendMessageDto } from './dto/sendMessageDto.dto';

@Injectable()
export class MessageService {
  constructor(private readonly whatsappService: WhatsappService) {}

  async sendMessage(data: SendMessageDto) {
    const { to, message } = data;
    console.log(message);

    const isFile = typeof message !== 'string';

    console.log(`É um arquivo? ${isFile}`);

    // this.whatsappService.sendTextMessage(sendMessageTextDto);
  }

  async sendMessageText(sendMessageTextDto: any) {
    console.log('mensagem');

    this.whatsappService.sendTextMessage(sendMessageTextDto);
  }

  async sendMessageFile(sendMessageFileDto: SendMessageFileDto) {
    //console.log(sendMessageFileDto, 'sdsd');
    const { base64 } = sendMessageFileDto;
    //console.log(base64);

    //const { message } = sendMessageTextDto;
    const teste = Buffer.from(base64, 'base64');
    // (async () => {
    //   const result = await filetype.fromBuffer(teste);
    //   //console.log(result);

    //   const extension = base64.split('/', mime.lookup(base64))[1];
    //   console.log(extension, 'dd');
    //   switch (result.ext) {
    //     case 'mp3':
    //       console.log('é mp3');
    //       this.whatsappService.sendVoiceMessage(sendMessageFileDto);
    //       break;
    //     case 'mp4':
    //       console.log('é mp4');
    //       this.whatsappService.sendVideoMessage(sendMessageFileDto);
    //       break;
    //     case 'jpg':
    //       console.log('é jpg');
    //       this.whatsappService.sendImageMessage(sendMessageFileDto);
    //       break;
    //     default:
    //       break;
    //   }
    // })();
  }
}
