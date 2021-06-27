import { INodeType } from '@modules/chatbot-flow/dto/createChatbotFlow.dto';
import { PrismaClient } from '@prisma/client';

export const defaultNodeStyles = {
  strokeWidth: '10px',
  border: '2px solid #777',
  padding: 10,
  borderRadius: '2px',
};

const firstNodeDefault = {
  id: '1',
  type: 'boxText',
  position: { x: 250, y: 0 },
  style: defaultNodeStyles,
  data: {
    id: '1',
    type: INodeType.NODE,
    title: 'Menu Principal',
    isEntryFlow: true,
    message:
      'Seja bem vindo ao menú principal do mchat, configure o fluxo para continuar',
  },
};

export default async function seedBotMessages(prisma: PrismaClient) {
  console.log('Seeding bot messages...');

  let firstMessage = await prisma.botMessage.findFirst({
    where: { id: firstNodeDefault.id },
  });
  if (firstMessage) return;

  firstMessage = await prisma.botMessage.create({
    data: {
      id: firstNodeDefault.id,
      title: firstNodeDefault.data.title,
      message: firstNodeDefault.data.message,
      extendsData: firstNodeDefault,
      isEntryFlow: firstNodeDefault.data.isEntryFlow,
    },
  });

  console.log('🌱 First bot message created...');
}
