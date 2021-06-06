import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { WhatsappModule } from './providers/whatsapp/whatsapp.module';
import { SocketioModule } from './providers/socketio/socketio.module';
import { MessageModule } from './modules/message/message.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register(),
    SocketioModule,
    WhatsappModule,
    MessageModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
