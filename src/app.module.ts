import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { WhatsappModule } from './providers/whatsapp/whatsapp.module';
import { SocketioModule } from './providers/socketio/socketio.module';
import { MessageModule } from './modules/message/message.module';
import { ContactModule } from './modules/contact/contact.module';
import { WhatsappConModule } from './modules/whatsappCon/whatasappCon.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { ChatbotFlowModule } from './modules/chatbot-flow/chatbot-flow.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register(),
    SocketioModule,
    WhatsappModule,
    MessageModule,
    ContactModule,
    WhatsappConModule,
    PrismaModule,
    ChatbotFlowModule,
  ],
})
export class AppModule {}
