import { Injectable } from '@nestjs/common';
import { WhatsappService } from '../../providers/whatsapp/whatsapp.service';
import { SendMessageFileDto } from './dto/sendMesasageFile.dto';
import { SendMessageDto } from './dto/sendMessageDto.dto';
import { SendMessageRequestDto } from './dto/SendMessageRequestDto';
import fs from 'fs';
import { uploadsFolderPath } from '@config/upload';
import mime from 'mime';
import axios from 'axios';
import ffmpeg from 'ffmpeg';

@Injectable()
export class MessageService {
  constructor(private readonly whatsappService: WhatsappService) {}

  async sendMessage(data: SendMessageRequestDto) {
    const { to, url, text, caption } = data;
    if (url === undefined || url === null) {
      const formattedMessage: SendMessageDto = {
        message: text,
        to: to,
      };
      const messageText = await this.whatsappService.sendTextMessage(
        formattedMessage,
      );
      return messageText;
    } else if (text === undefined || text === null) {
      let messageFile: any;
      try {
        const response = await axios({
          url: url,
          method: 'GET',
          responseType: 'stream',
        });
        const filename = url.split('/files/').pop();
        const file = fs.createWriteStream(`${uploadsFolderPath}/${filename}`);

        response.data.pipe(file);

        return new Promise((resolve, reject) => {
          file.on('finish', async () => {
            let formattedFile: SendMessageFileDto;
            let mimeType;

            if (filename.split('-').pop() === 'audio.webm') {
              const newFilename = `${filename.split('.').shift()}.mp3`;
              try {
                var process = await new ffmpeg(
                  `${uploadsFolderPath}/${filename}`,
                );

                const response = await process.fnExtractSoundToMP3(
                  `${uploadsFolderPath}/${newFilename}`,
                );
              } catch (e) {
                console.log(e.code);
                console.log(e.msg);
                throw new Error('Falha na conversão para mp3');
              }
              formattedFile = {
                path: `${uploadsFolderPath}/${newFilename}`,
                to: to,
                filename: newFilename,
                subtitle: caption,
              };
              mimeType = mime.lookup(`${uploadsFolderPath}/${newFilename}`);
            } else {
              formattedFile = {
                path: `${uploadsFolderPath}/${filename}`,
                to: to,
                filename: filename,
                subtitle: caption,
              };
              mimeType = mime.lookup(`${uploadsFolderPath}/${filename}`);
            }

            const generalType = mimeType.split('/').shift();

            switch (generalType) {
              case 'audio':
                messageFile = await this.whatsappService.sendVoiceMessage(
                  formattedFile,
                );
                break;
              case 'video':
                messageFile = await this.whatsappService.sendFileDocument(
                  formattedFile,
                );
                break;
              case 'image':
                messageFile = await this.whatsappService.sendImageMessage(
                  formattedFile,
                );
                break;
              case 'application':
                messageFile = await this.whatsappService.sendFileDocument(
                  formattedFile,
                );

                break;
              default:
                break;
            }
            resolve(messageFile);
          });
          file.on('error', reject);
        });
      } catch (error) {
        throw new Error('Falha no download do arquivo');
      }
    }
  }
}
