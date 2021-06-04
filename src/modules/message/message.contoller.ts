import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageFileDto } from './dto/send-message-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import uploadConfig from '@config/upload';
import { SendMessageRequestDto } from './dto/SendMessageRequestDto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('message', {
      storage: uploadConfig.multer.storage,
    }),
  )
  async sendMessage(
    @Body() body: SendMessageRequestDto,
    @UploadedFile() file?: any,
  ) {
    // console.log(file);
    // console.log(body);

    this.messageService.sendMessage({
      to: body.to,
      message: file || body.message,
    });
  }
  @Post('/file')
  async sendMessageFile(
    @Body()
    sendMessageFileDto: SendMessageFileDto,
  ) {
    console.log('rrrrrr');
    this.messageService.sendMessageFile(sendMessageFileDto);
  }
}
