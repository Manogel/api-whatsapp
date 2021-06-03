import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { SendMessageTextDto } from './dto/send-message-text.dto';
import { SendMessageFileDto } from './dto/send-message-file.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/text')
  async sendMessageText(@Body() sendMessageTextDto: SendMessageTextDto) {
    console.log('rrrrrr');
    this.messageService.sendMessageText(sendMessageTextDto);
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
