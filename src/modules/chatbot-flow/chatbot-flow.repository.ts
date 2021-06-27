import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@providers/prisma/prisma.service';

type ICreateBotFlow = Prisma.XOR<
  Prisma.BotMessageFlowCreateInput,
  Prisma.BotMessageFlowUncheckedCreateInput
>;

type IUpdateBotMessage = Prisma.XOR<
  Prisma.BotMessageUpdateInput,
  Prisma.BotMessageUncheckedUpdateInput
>;

@Injectable()
export class ChatbotFlowRepository {
  constructor(private readonly databaseService: PrismaService) {}

  async createMessageNode(entry: Prisma.BotMessageCreateInput) {
    const botMessage = await this.databaseService.botMessage.create({
      data: entry,
    });
    return botMessage;
  }

  async updateMessageNode(entryId: string, entry: IUpdateBotMessage) {
    const botMessage = await this.databaseService.botMessage.update({
      where: {
        id: entryId,
      },
      data: entry,
    });
    return botMessage;
  }

  async createConnectionNode(entry: Prisma.BotMessageFlowCreateInput) {
    const nodeFlow = await this.databaseService.botMessageFlow.create({
      data: entry,
    });
    return nodeFlow;
  }

  async createOrUpdateConnectioNode(entry: ICreateBotFlow) {
    const nodeFlow = await this.databaseService.botMessageFlow.upsert({
      where: {
        id: entry.id,
      },
      update: entry,
      create: entry,
    });

    return nodeFlow;
  }

  async findAll() {
    const [messageNodes, flowNodes] = await this.databaseService.$transaction([
      this.databaseService.botMessage.findMany({
        where: {
          deletedAt: null,
        },
      }),
      this.databaseService.botMessageFlow.findMany({
        where: {
          deletedAt: null,
        },
      }),
    ]);

    return [...messageNodes, ...flowNodes];
  }

  async deleteMessageNodeId(registerId: string) {
    await this.databaseService.botMessage.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: registerId,
      },
    });
    return true;
  }

  async deleteConnectionNodeId(registerId: string) {
    await this.databaseService.botMessageFlow.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id: registerId,
      },
    });
    return true;
  }
}
