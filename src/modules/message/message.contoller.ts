import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageTextDto } from './dto/sendMessageText.dto';
import { SendMessageFileDto } from './dto/sendMessageFile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/text')
  async sendMessageText(@Body() sendMessageTextDto: SendMessageTextDto) {
    console.log('rrrrrr');
    this.messageService.sendMessageText(sendMessageTextDto);
  }
  @UseInterceptors(FileInterceptor('file'))
  @Post('/file')
  async sendMessageFile(
    @Body()
    sendMessageFileDto: SendMessageFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('rrrrrr');
    this.messageService.sendMessageFile(sendMessageFileDto, file);
  }
}
