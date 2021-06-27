import { Injectable } from '@nestjs/common';
import { ChatbotFlowRepository } from './chatbot-flow.repository';
import { CreateChatbotFlowDto } from './dto/createChatbotFlow.dto';
import { CreateMessageNodeDto } from './dto/createMessageNode.dto';

@Injectable()
export class ChatbotFlowService {
  constructor(private readonly chatbotFlowRepo: ChatbotFlowRepository) {}
  async createMessageNode(chatbotMessageDto: CreateMessageNodeDto) {
    const { id, title, message, isEntryFlow, isFinalFlow, extendsData } =
      chatbotMessageDto;

    const node = await this.chatbotFlowRepo.createMessageNode({
      id,
      title,
      message,
      isEntryFlow,
      isFinalFlow,
      extendsData,
    });

    return node;
  }

  async updateMessageNode(id: string, chatbotMessageDto: CreateMessageNodeDto) {
    const { title, message, isEntryFlow, isFinalFlow, extendsData } =
      chatbotMessageDto;

    const node = await this.chatbotFlowRepo.updateMessageNode(id, {
      id,
      title,
      message,
      isEntryFlow,
      isFinalFlow,
      extendsData,
    });

    return node;
  }

  async deleteMessageNode(id: string) {
    const node = await this.chatbotFlowRepo.deleteMessageNodeId(id);

    return node;
  }

  async createOrUpdateConnectioNode(
    createChatbotFlowDto: CreateChatbotFlowDto,
  ) {
    const {
      id,
      source,
      target,
      customMessageIfAnswerIsInvalid,
      messageIfAnswerIsInvalidId,
      mustBeEqualTo,
      extendsData,
    } = createChatbotFlowDto;

    const node = await this.chatbotFlowRepo.createOrUpdateConnectioNode({
      id,
      sourceMessageId: source,
      targetMessageId: target,
      mustBeEqualTo,
      customMessageIfAnswerIsInvalid,
      messageIfAnswerIsInvalidId,
      extendsData,
    });

    return node;
  }

  async deleteConnectionNode(id: string) {
    const node = await this.chatbotFlowRepo.deleteConnectionNodeId(id);

    return node;
  }

  async findAll() {
    const elements = await this.chatbotFlowRepo.findAll();
    return elements;
  }
}
