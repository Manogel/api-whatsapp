import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { FileInterceptor } from '@nestjs/platform-express';
import uploadConfig from '@config/upload';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SendMessageRequestDto } from './dto/SendMessageRequestDto';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('message', {
      storage: uploadConfig.multer.storage,
    }),
  )
  @ApiConsumes('multipart/form-data', 'json')
  async sendMessage(
    @Body() body: SendMessageRequestDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const response = await this.messageService.sendMessage({
      to: body.to,
      subtitle: body.subtitle,
      message: file || body.message,
    });
    return response;
  }
}
