import { Injectable } from '@nestjs/common';
import { WhatsappService } from '../../providers/whatsapp/whatsapp.service';
import { SendMessageTextDto } from './dto/sendMessageText.dto';
import { SendMessageFileDto } from './dto/sendMessageFile.dto';
import * as filetype from 'file-type';

@Injectable()
export class MessageService {
  constructor(private readonly whatsappService: WhatsappService) {}

  async sendMessageText(sendMessageTextDto: SendMessageTextDto) {
    console.log('mensagem');

    this.whatsappService.sendTextMessage(sendMessageTextDto);
  }

  async sendMessageFile(
    sendMessageFileDto: SendMessageFileDto,
    file: Express.Multer.File,
  ) {
    const base64 = file.buffer.toString('base64');
    const dtoFormatted: SendMessageFileDto = {
      to: sendMessageFileDto.to,
      base64: base64,
      filename: file.filename,
      caption: sendMessageFileDto.caption,
    };

    const teste = Buffer.from(base64, 'base64');
    (async () => {
      const result = await filetype.fromBuffer(teste);

      switch (result.ext) {
        case 'mp3':
          this.whatsappService.sendVoiceMessage(dtoFormatted);
          break;
        case 'mp4':
          this.whatsappService.sendVideoMessage(dtoFormatted);
          break;
        case 'jpg':
          this.whatsappService.sendImageMessage(dtoFormatted);
          break;
        default:
          break;
      }
    })();
  }
}
