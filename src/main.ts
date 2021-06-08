import { getAsyncAppConfig } from '@config/app';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import express from 'express';
import uploadConfig from '@config/upload';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = getAsyncAppConfig();
  // Deixei uma variavel ambiente como melhoria
  const PORT = appConfig.port;
  app.use('/files', express.static(uploadConfig.tmpFolder));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(`The ${process.env.APP_NAME} API description`)
    .setVersion(process.env.APP_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(PORT, () => {
    console.log(`🚀 App is running on port ${PORT}`);
  });
}
bootstrap();
