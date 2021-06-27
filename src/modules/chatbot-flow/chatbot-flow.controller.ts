import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ChatbotFlowService } from './chatbot-flow.service';
import { CreateOrUpdateConnectionNodeDto } from './dto/createOrUpdateConnectionNode.dto';
import { CreateMessageNodeDto } from './dto/createMessageNode.dto';

@Controller('chatbot-flow')
export class ChatbotFlowController {
  constructor(private readonly chatbotFlowService: ChatbotFlowService) {}

  @Post('messages')
  create(@Body() chatbotMessageDto: CreateMessageNodeDto) {
    return this.chatbotFlowService.createMessageNode(chatbotMessageDto);
  }

  @Put('messages/:id')
  updateMessageNode(
    @Body() chatbotMessageDto: CreateMessageNodeDto,
    @Param('id') chatbotMessageId: string,
  ) {
    return this.chatbotFlowService.updateMessageNode(
      chatbotMessageId,
      chatbotMessageDto,
    );
  }

  @Delete('messages/:id')
  deleteMessageNode(@Param('id') chatbotMessageId: string) {
    return this.chatbotFlowService.deleteMessageNode(chatbotMessageId);
  }

  @Put('connections')
  createOrUpdateConnectioNode(
    @Body() updateChatbotFlowDto: CreateOrUpdateConnectionNodeDto,
  ) {
    return this.chatbotFlowService.createOrUpdateConnectioNode(
      updateChatbotFlowDto,
    );
  }

  @Delete('connections/:id')
  deleteConnectionNode(@Param('id') connectionId: string) {
    return this.chatbotFlowService.deleteConnectionNode(connectionId);
  }

  @Get()
  findAll() {
    return this.chatbotFlowService.findAll();
  }
}
