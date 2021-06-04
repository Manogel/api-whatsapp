import { Injectable } from '@nestjs/common';
import { WhatsappService } from '../../providers/whatsapp/whatsapp.service';
import { SendMessageFileDto } from './dto/sendMesasageFile.dto';
import { SendMessageDto } from './dto/sendMessageDto.dto';

@Injectable()
export class MessageService {
  constructor(private readonly whatsappService: WhatsappService) {}

  async sendMessage(data: SendMessageDto) {
    const { to, message } = data;

    const isFile = typeof message !== 'string';

    if (isFile) {
      const messageToFile = message as Express.Multer.File;
      const originalname = messageToFile.originalname;
      const formatted: SendMessageFileDto = {
        path: messageToFile.path,
        to: to,
        filename: messageToFile.filename,
        subtitle: messageToFile.filename,
      };
      const extension = originalname.slice(
        ((originalname.lastIndexOf('.') - 1) >>> 0) + 2,
      );
      console.log(extension, 's');
      switch (extension) {
        case 'mp3':
          console.log('é mp3');
          this.whatsappService.sendVoiceMessage(formatted);
          break;
        case 'mp4':
          console.log('é mp4');
          this.whatsappService.sendVideoAsGifMessage(formatted);
          break;
        case 'jpg':
          console.log('é jpg');
          this.whatsappService.sendImageMessage(formatted);
          break;
        default:
          break;
      }
    } else {
      this.whatsappService.sendTextMessage(data);
    }
  }
}
