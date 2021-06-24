import { Injectable } from '@nestjs/common';
import { WhatsappService } from '../../providers/whatsapp/whatsapp.service';
import { SendMessageFileDto } from './dto/sendMesasageFile.dto';
import { SendMessageDto } from './dto/sendMessageDto.dto';
import { SendMessageRequestDto } from './dto/SendMessageRequestDto';

@Injectable()
export class MessageService {
  constructor(private readonly whatsappService: WhatsappService) {}

  async sendMessage(data: SendMessageRequestDto) {
    const { to, message } = data;
    const isFile = typeof message !== 'string';

    if (isFile) {
      const { subtitle } = data;
      const messageToFile = message as Express.Multer.File;
      const type = messageToFile.mimetype;
      const formattedFile: SendMessageFileDto = {
        path: messageToFile.path,
        to: to,
        filename: messageToFile.filename,
        subtitle: subtitle,
      };
      let messageFile: any;

      const generalType = type.split('/').shift();
      switch (generalType) {
        case 'audio':
          messageFile = await this.whatsappService.sendVoiceMessage(
            formattedFile,
          );
          break;
        case 'video':
          messageFile = await await this.whatsappService.sendFileDocument(
            formattedFile,
          );
          break;
        case 'image':
          messageFile = await await this.whatsappService.sendImageMessage(
            formattedFile,
          );
          break;
        case 'application':
          messageFile = await await this.whatsappService.sendFileDocument(
            formattedFile,
          );

          break;
        default:
          break;
      }
      return messageFile;
    } else {
      const formattedMessage: SendMessageDto = {
        message: message as string,
        to: to,
      };
      const messageText = await this.whatsappService.sendTextMessage(
        formattedMessage,
      );
      return messageText;
    }
  }
}
