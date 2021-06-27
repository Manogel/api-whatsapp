import { Module } from '@nestjs/common';
import { ChatbotFlowService } from './chatbot-flow.service';
import { ChatbotFlowController } from './chatbot-flow.controller';
import { ChatbotFlowRepository } from './chatbot-flow.repository';
import { PrismaModule } from '@providers/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChatbotFlowController],
  providers: [ChatbotFlowService, ChatbotFlowRepository],
})
export class ChatbotFlowModule {}
