import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiTags } from '@nestjs/swagger';
import { SendMessageRequestDto } from './dto/SendMessageRequestDto';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(@Body() body: SendMessageRequestDto) {
    const response = await this.messageService.sendMessage({
      to: body.to,
      caption: body.caption,
      text: body.text,
      url: body.url,
    });
    return response;
  }
}
